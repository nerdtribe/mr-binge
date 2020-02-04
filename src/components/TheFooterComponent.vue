<template>
  <v-footer dark
            app>
    <span class="px-3">Made with <v-icon small
                                         color="warning">mdi-heart</v-icon> by
      <a href="https://github.com/nerdtribe"
         target="_blank">nerdtribe</a></span>
  </v-footer>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheFooterComponent"
});
</script>

<style lang="sass">
footer
  position: fixed !important
</style>
