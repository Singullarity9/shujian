import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//先VueRouter原型对象的push、replace方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push/replace方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/Register.vue')
  },
  {
    path: '/bookcategory/:bookCategoryName',
    name: 'bookcategory',
    component: () => import('@/views/BookCategory/BookCategory.vue'),
    props: ($route) => {
      return { bookCategoryName: $route.params.bookCategoryName };
    }
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('@/views/Book/Book.vue'),
    props: ($route) => {
      return { id: $route.params.id };
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess')
  },
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart')
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade')
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay')
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess')
  }
]

const router = new VueRouter({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
