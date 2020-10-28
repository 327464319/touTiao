import Axios from 'axios'

const REQUEST_KEY = Symbol('request')
if (!global[REQUEST_KEY]) {
  global[REQUEST_KEY] = Axios.create({ baseURL: 'http://ttapi.research.itcast.cn/' })
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
}, function (error) {
  // console.log('error', error)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    window.localStorage.clear('token_key')
  }
  return Promise.reject(error)
})

export default global[REQUEST_KEY]
// const requst = Axios.create({ baseURL: 'http://ttapi.research.itcast.cn/' })
// export default requst
