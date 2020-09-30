/*
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 09:23:54
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-28 09:34:05
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Field, CellGroup, Cell, Button, Dialog } from "vant";

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Field);
Vue.use(Dialog);

import "amfe-flexible/index.js";

// import Vant from 'vant'
import "vant/lib/index.css";
// Vue.use(Vant)
// import Vue from 'vue';

import http from "../src/request/http";
import api from "../src/request/api";

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
// import md5 from "js-md5";
// Vue.prototype.$md5 = md5;

router.beforeEach((to, from, next) => {
  //动态设置网页标题
  document.title = to.meta.title;
  next();
});

// use
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
