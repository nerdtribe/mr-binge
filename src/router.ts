import Vue from 'vue';
import Router from 'vue-router';
import TheNavbarView from '@/views/TheNavbarView.vue';
import TheFooterView from '@/views/TheFooterView.vue';
import MovieView from '@/views/MovieView.vue';
import TvView from '@/views/TvView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        default: TheNavbarView,
        tv: MovieView,
        footer: TheFooterView,
      },
    },
    {
      path: '/tv',
      components: {
        default: TheNavbarView,
        tv: TvView,
        footer: TheFooterView,
      },
    },
  ],
});
