<template>
  <v-app dark>
    <v-content app>
      <router-view/>
      <router-view name='tv'/>
    </v-content>
    <TheFooterView/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheFooterView from '@/views/TheFooterView.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheFooterView,
  },
  data: () => ({ }),
});
</script>

<style lang="sass">
body
  margin: 0
</style>
