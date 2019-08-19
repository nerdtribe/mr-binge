<template>
  <v-app id="sandbox">
    <!-- <v-navigation-drawer permanent clipped floating mini-variant fixed overflow app> -->
    <v-navigation-drawer
      permanent
      mini-variant
      clipped
      app
    >
      <v-toolbar class="transparent">
        <v-list class="mt-5 pa-0">
          <v-list-item>
            <v-list-item-avatar
              tile
              size="50"
            >
              <img src="@/assets/logo.png">
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item
            to="/"
            class="mt-5"
          >
            <v-list-item-avatar>
              <img src="@/assets/movie.png">
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item
            to="/tv"
            class="mt-3"
          >
            <v-list-item-avatar>
              <img src="@/assets/tv.png">
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <v-footer
      inset
      app
    >
      <span class="px-3">
        Made with
        <v-icon
          small
          color="red"
        >mdi-favorite</v-icon>&nbsp;by StangLab
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({}),
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>

<style lang="sass">
.tile
  margin: 10px 0
</style>
