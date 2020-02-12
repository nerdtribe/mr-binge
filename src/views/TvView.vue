<template>
  <MediaComponent type="tv" />
</template>

<script>
import Vue from "vue";
import MediaComponent from "../components/MediaComponent.vue";

export default Vue.extend({
  name: "TvView",
  components: {
    MediaComponent
  }
});
</script>
