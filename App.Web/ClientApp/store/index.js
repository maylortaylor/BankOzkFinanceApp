import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../services/localStorage.service';
import axios from 'axios'
Vue.use(Vuex)

// TYPES
const SELECTED_SGOAL = 'SELECTED_SGOAL';
const REFRESHED_DATA = 'REFRESHED_DATA';
const LOGIN_START = 'LOGIN_START';
const LOGIN_STOP = 'LOGIN_STOP';
const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';
const LOGOUT = 'LOGOUT';
// STATE
const state = {
  selectedSavingsGoal: null,
  accessToken: null
}

// MUTATIONS
const mutations = {
  [LOGIN_START]: state => state.loggingIn = true,
  [LOGIN_STOP]: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
  [UPDATE_ACCESS_TOKEN]: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  [LOGOUT]: (state) => {
    state.accessToken = null;
  },
  [SELECTED_SGOAL](state, obj) {
    state.selectedSavingsGoal = obj.selectedSavingsGoal
  },
  [REFRESHED_DATA](state, obj) {
    console.log("refresh event", obj);
  }
}

// ACTIONS
const actions = ({
  doLogin({ commit }, loginData) {
    console.log('DO LOGIN');

    commit('LOGIN_START');

    axios.post('https://reqres.in/api/login', {
      ...loginData
    })
      .then(response => {
        LocalStorage.setItem('accessToken', response.data.token);
        commit('LOGIN_STOP', null);
        commit('UPDATE_ACCESS_TOKEN', response.data.token);
        router.push('/users');
      })
      .catch(error => {
        commit('LOGIN_STOP', error.response.data.error);
        commit('UPDATE_ACCESS_TOKEN', null);
      })
  },
  fetchAccessToken({ commit }) {
    commit('UPDATE_ACCESS_TOKEN', LocalStorage.getItem('accessToken'));
  },
  logout({ commit }) {
    LocalStorage.deleteItem('accessToken');
    commit('LOGOUT');
    router.push('/login');
  }
})

export default new Vuex.Store({
  state,
  mutations,
  actions
})
