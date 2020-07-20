import Vue from "vue";
import VueYouTubeEmbed from "vue-youtube-embed";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.use(VueYouTubeEmbed);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.dispatch("loadDb");
    console.warn("Reminder for prod release that BrowserWindow() webSecurity is set to false!");
  },
  render: h => h(App)
}).$mount("#app");
