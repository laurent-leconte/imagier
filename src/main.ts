import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueConfetti from "vue-confetti";

Vue.config.productionTip = false;
Vue.use(VueConfetti);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
