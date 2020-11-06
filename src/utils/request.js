import Axios from 'axios'
import JSONbig from 'json-bigint'
import Store from '@/store/index.js'
import router from '../router'
const REQUEST_KEY = Symbol('request')
if (!global[REQUEST_KEY]) {
  global[REQUEST_KEY] = Axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function (data) {
    // Do whatever you want to transform the data

      try {
        return JSONbig.parse(data)
      } catch (e) {
        return data
      }
    }]
  })
}
// global[REQUEST_KEY].interceptors.request.use(config => {
//   if (window.localStorage.getItem('token_key')) {
//     const obj = JSON.parse(window.localStorage.getItem('token_key'))
//     config.headers.Authorization = 'Bearer ' + obj.token
//   }

//   return config
// })

// Add a request interceptor
global[REQUEST_KEY].interceptors.request.use(function (config) {
  if (window.localStorage.getItem('token_key')) {
    const obj = JSON.parse(window.localStorage.getItem('token_key'))
    config.headers.Authorization = 'Bearer ' + obj.token
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
global[REQUEST_KEY].interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // console.log('error', error)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response?.status === 401) {
    const req = Axios.create()
    req.interceptors.request.use(function (config) {
      config.headers.Authorization = 'Bearer ' + Store.state.token.refresh_token
      return config
    })
    try {
      if (!Store.state.token || !Store.state.token.token) {
        return router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      const { data: res } = await req.put('http://ttapi.research.itcast.cn/app/v1_0/authorizations')

      const userToken = JSON.parse(window.localStorage.getItem('token_key'))
      userToken.token = res.data.token
      window.localStorage.setItem('token_key', JSON.stringify(userToken))

      return global[REQUEST_KEY](error.config)
    } catch (e) {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(error)
})

export default global[REQUEST_KEY]
// const requst = Axios.create({ baseURL: 'http://ttapi.research.itcast.cn/' })
// export default requst
