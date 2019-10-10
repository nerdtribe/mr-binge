<template>
  <v-card flat tile>
    <v-img 
      :src=imageSrc
    ></v-img>
    <v-card-actions>
      <p>{{ title }}</p>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MediaCardComponent',
  props: {
    imageSrc: String,
    title: String,
  },
});
</script>

<style lang="sass">
.v-card
  margin: 5px
  .v-img
    height: 100px
</style>
