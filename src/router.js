import Vue from 'vue'
import Router from 'vue-router'
import MediaList from './components/MediaList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MediaList,
      props: {
        mediaType: 'Movies',
        titleNameFormat: 'title',
        releaseDateFormat: 'release_date',
        isTV: false
      }
    },
    {
      path: '/tv',
      name: 'tv',
      component: MediaList,
      props: {
        mediaType: 'TV',
        titleNameFormat: 'name',
        releaseDateFormat: 'first_air_date',
        isTV: true
      }
    }
  ]
})
