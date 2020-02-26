<template>
  <div>
    <button @click="$router.go(-1)">
      Go Back
    </button>
    <p>Route ID: {{ $route.params.id }}</p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MediaDetailComponent"
});
</script>
