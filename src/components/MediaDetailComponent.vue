<template>
  <div>
    <button @click="navigateBack">Go Back</button>
    <p>Route ID: {{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'MediaDetailComponent',
  methods: {
    navigateBack() {
      router.go(-1);
    },
  },
});
</script>
