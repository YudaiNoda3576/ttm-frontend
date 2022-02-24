import Vue from 'vue'
import Vuex from 'vuex'
import {auth, app} from './modules/'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    app
  },
});

// store.dispatch('app/init')

export default store 