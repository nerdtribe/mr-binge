<template>
  <v-app>
    <TheNavbarView/>

    <v-content>
      <router-view/>
      <router-view name='tv'/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbarView from '@/views/TheNavbarView.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheNavbarView,
  },
  data: () => ({ }),
});
</script>
