<template>
  <MediaComponent type="movies" />
</template>

<script lang="ts">
import Vue from "vue";
import MediaComponent from "@/components/MediaComponent.vue";

export default Vue.extend({
  components: {
    MediaComponent
  }
});
</script>
