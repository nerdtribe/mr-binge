<template>
  <v-navigation-drawer app
                       dark
                       mini-variant
                       permanent>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img :src="require('../static/logo.png')" />
      </v-list-item-avatar>
    </v-list-item>

    <v-divider />

    <v-list-item to="/"
                 class="pa-2">
      <v-img :src="require('../static/movie.png')" />
    </v-list-item>

    <v-list-item to="/tv"
                 class="pa-2">
      <v-img :src="require('../static/tv.png')" />
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheNavbarComponent"
});
</script>
