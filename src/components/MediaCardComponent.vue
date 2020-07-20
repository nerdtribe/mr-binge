<template>
  <v-card
    flat
    tile
    :to="`/detail/${type}/${id}`">
    <v-img :src="imageSrc" />
    <v-card-actions>
      <p>{{ title }} id: {{ id }}</p>
    </v-card-actions>
  </v-card>
</template>


<script>
import Vue from "vue";

export default Vue.extend({
  name: "MediaCardComponent",
  props: {
    imageSrc: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style lang='sass'>
.v-card
  margin: 5px
  .v-img
    height: 100px
</style>
