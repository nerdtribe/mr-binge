import Vue from "vue";
import VueYouTubeEmbed from "vue-youtube-embed";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import db from "./store/db";

Vue.use(VueYouTubeEmbed);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    const data = db.readDatabase();
    this.$store.dispatch("loadDb", data);
  },
  render: h => h(App)
}).$mount("#app");
