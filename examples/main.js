import Vue from "vue";
import App from "@/App.vue";
// import "./plugins/ant-design-vue.js";
import "@/plugins/element.js";
import router from "@/plugins/router";
import Seed from "seed-toolkit/packages/index.js";

Vue.use(Seed);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
