import Vue from 'vue';
import Router from 'vue-router';
import TheNavbarComponent from '@/components/TheNavbarComponent.vue';
import MovieView from '@/views/MovieView.vue';
import TvView from '@/views/TvView.vue';
import DetailView from '@/views/DetailView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        default: TheNavbarComponent,
        component: MovieView,
      },
    },
    {
      path: '/tv',
      components: {
        default: TheNavbarComponent,
        component: TvView,
      },
    },
    {
      path: '/detail/:id',
      components: {
        default: TheNavbarComponent,
        component: DetailView,
      },
      props: { default: true, component: true },
    },
  ],
});
