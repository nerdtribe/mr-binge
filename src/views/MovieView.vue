<template>
  <MediaComponent type="movies" />
</template>

<script>
import Vue from "vue";
import MediaComponent from "../components/MediaComponent.vue";

export default Vue.extend({
  components: {
    MediaComponent
  }
});
</script>
