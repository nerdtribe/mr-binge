<template>
  <v-app>
    <v-content>
      <router-view />
      <router-view name="component" />
    </v-content>
    <TheFooterComponent />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheFooterComponent from '@/components/TheFooterComponent.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheFooterComponent,
  },
  data: () => ({ }),
});
</script>

<style lang="sass">
body
  margin: 0
</style>
