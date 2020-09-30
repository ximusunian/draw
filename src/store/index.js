/*
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 09:23:54
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-29 17:09:45
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLogin: false,
    showHowGet: false,
    showMyPrize: false,
    showShareBox: false,
    showWining: false
  },
  mutations: {
    changeShowLogin(state, data) {
      state.showLogin = data
    },
    changeShowHowGet(state, data) {
      state.showHowGet = data
    },
    changeShowMyPrize(state, data) {
      state.showMyPrize = data
    },
    changeShowShareBox(state, data) {
      state.showShareBox = data
    },
    changeShowWining(state, data) {
      state.showWining = data
    }
  },
  actions: {},
  modules: {}
});
