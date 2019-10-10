<template>
  <v-navigation-drawer app dark mini-variant permanent>
    <v-list-item>
      <v-list-item-avatar tile>
        <v-img src="@/assets/logo.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item to="/">
      <v-list-item-avatar>
        <v-img src="@/assets/movie.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item to="/tv">
      <v-list-item-avatar>
        <v-img src="@/assets/tv.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'TheNavbarComponent',
});
</script>
