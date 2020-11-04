import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/login/login.vue')
const Index = () => import('../components/layou/index.vue')
const Home = () => import('../components/layou/home.vue')
const Pa = () => import('../components/layou/question.vue')
const Video = () => import('../components/layou/video.vue')
const My = () => import('../components/layou/my.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/userProfile',
    component: () => import('../components/user/UserProfile.vue'),
    meta: {
      index: 2
    }
  },

  { path: '/login', component: Login },
  { path: '/search', component: () => import('../components/search/search.vue') },
  { name: 'articleRouter', path: '/article/:articleId', component: () => import('../components/article/article.vue'), props: true },

  {
    path: '/',
    component: Index,
    redirect: '/home',

    children: [
      {
        path: '/my',
        component: My,
        meta: {
          index: 1
        }

      },

      { path: '/home', component: Home },
      { path: '/video', component: Video },
      { path: '/pa', component: Pa }

    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })

export default router
