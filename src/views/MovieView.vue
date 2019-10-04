<template>
  <MovieComponent />
</template>

<script lang="ts">
import Vue from 'vue';
import MovieComponent from '@/components/MovieComponent.vue';

export default Vue.extend({
  components: {
    MovieComponent,
  },
});
</script>
