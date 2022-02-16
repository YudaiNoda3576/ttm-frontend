import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const getAuthState = () => ({
  emailAddress: null,
  error: false
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
    state.error = false;
  },
  updateError(state) {
    state.error = true;
  }
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
      })
      .catch(() => {
        commit('updateError')
      });
  },
  logout({ commit }) {
    axios.post('/logout').then(() => {
      commit('resetData');
    });
  },
},
});


