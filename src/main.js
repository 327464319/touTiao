import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.scss'
import '@/utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false
// Vue.prototype.$http = router
new Vue({
  data () {
    return {
      // direction: 'slide-left'
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
