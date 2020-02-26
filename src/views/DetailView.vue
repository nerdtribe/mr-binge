<template>
  <MediaDetailComponent />
</template>

<script>
import Vue from "vue";
import MediaDetailComponent from "../components/MediaDetailComponent.vue";

export default Vue.extend({
  name: "DetailView",
  components: {
    MediaDetailComponent
  }
});
</script>
