import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {isPublic: false}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {isPublic: false}
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // 非公開コンポーネントで未ログインの場合ログイン画面にリダイレクト
  if (
    to.matched.some(
      record => (record.meta.isPublic || Store.getters.isAuthenticated)
    )
  ) {
    next();
  } else {
    next({ path: "/", query: { redirect: to.fullPath } });
  }
});

export default router
