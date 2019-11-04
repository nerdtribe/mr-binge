<template>
  <div>
    <button @click="$router.go(-1)">Go Back</button>
    <p>Route ID: {{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  name: "MediaDetailComponent"
});
</script>
