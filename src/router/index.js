import Vue from "vue";
import VueRouter from "vue-router";
import TheNavbarComponent from "@/components/TheNavbarComponent";
import MovieView from "@/views/MovieView";
import TvView from "@/views/TvView";
import DetailView from "@/views/DetailView";
import SettingsView from "@/views/SettingsView";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    components: {
      default: TheNavbarComponent,
      component: MovieView
    }
  },
  {
    path: "/tv",
    components: {
      default: TheNavbarComponent,
      component: TvView
    }
  },
  {
    path: "/settings",
    components: {
      default: TheNavbarComponent,
      component: SettingsView
    }
  },
  {
    path: "/detail/:id",
    components: {
      default: TheNavbarComponent,
      component: DetailView
    },
    props: { default: true, component: true }
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
