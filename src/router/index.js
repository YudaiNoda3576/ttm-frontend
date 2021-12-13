import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index.js'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
          path: '/',
          name: 'Login',
          component: Login,
          meta: {isPublic: true}
    },
    layout('Default', [
      route('Home', null, '/home', false)
    ])
  ]
})

router.beforeEach((to, from, next) => {
  console.log(store)
  // 非公開コンポーネントで未ログインの場合ログイン画面にリダイレクト
  if (
    to.matched.some(
      // TODO:Store.stateのアクセス方法が不明確なので今後修正を行うこと
      record => (record.meta.isPublic || store.state)
    )
  ) {
    next();
  } else {
    next({ path: "/", query: { redirect: to.fullPath } });
  }
});

export default router
