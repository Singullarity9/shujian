import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import Footer from '@/components/Footer/Footer.vue'
import Logo from "@/assets/images/logo.png"
import '@/assets/css/global.css'

Vue.prototype.$imgLogo = Logo
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('Footer', Footer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
