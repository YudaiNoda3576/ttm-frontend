// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'ホーム',
      icon: 'mdi-home-circle-outline',
      to: '/home',
    },{
      title: '檀家管理',
      icon: 'mdi-account-box-multiple',
      to: '/danka',
    },

  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
}


const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
