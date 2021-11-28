import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const getAuthState = () => ({
  emailAddress: null
});

export default new Vuex.Store({

state: getAuthState(),

getters: {
  isAuthenticated: state => {
    return state.emailAddress != null;
  },
},
mutations: {
  updateId(state, emailAddress) {
    state.emailAddress = emailAddress;
  },
  resetData(state) {
    state.emailAddress = null;
  },
},
actions: {
  login({ commit }, authData) {
    axios
      .post('/login', {
        emailAddress: authData.emailAddress,
        password: authData.password,
      })
      .then(() => {
        commit('updateId', authData.emailAddress);
      });
  },
  logout({ commit }) {
    axios.post('/logout').then(() => {
      commit('resetData');
    });
  },
},
});


