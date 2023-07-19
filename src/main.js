import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import Logo from "@/assets/images/logo.png"
import '@/assets/css/global.css'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import SubNavBar from '@/components/SubNavBar/SubNavBar.vue'
import axios from 'axios'

axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.prototype.$imgLogo = Logo
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.component(NavBar.name, NavBar)
Vue.component(SubNavBar.name, SubNavBar)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$eventBus = this
  }
}).$mount('#app')
