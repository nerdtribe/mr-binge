<template>
  <TheSettingsComponent />
</template>

<script>
import Vue from "vue";
import TheSettingsComponent from "../components/TheSettingsComponent.vue";

export default Vue.extend({
  name: "SettingsView",
  components: {
    TheSettingsComponent
  }
});
</script>
