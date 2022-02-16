import axios from 'axios'

const state = {
    state: {
        emailAddress: null,
        error: false
    }
}

const getters = {
  isAuthenticated: state => {
    return state.state.emailAddress != null;
  },
}

const mutations = {
  updateId(state, emailAddress) {
    state.state.emailAddress = emailAddress;
  },
  resetData(state) {
    state.state.emailAddress = null;
    state.state.error = false;
  },
  updateError(state) {
    state.state.error = true;
  }
}

const actions = {
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}