<template>
  <v-app id="sandbox" dark>
    <v-navigation-drawer
      permanent
      clipped
      floating
      mini-variant
      fixed
      overflow
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="mt-5 pa-0">
          <v-list-tile>
            <v-list-tile-avatar size="50">
              <img src="@/assets/logo.png">
            </v-list-tile-avatar>
          </v-list-tile>
          <v-list-tile to="/" class="mt-5">
            <v-list-tile-avatar>
              <img src="@/assets/movie.png">
            </v-list-tile-avatar>
          </v-list-tile>
          <v-list-tile to="/tv" class="mt-3">
            <v-list-tile-avatar>
              <img src="@/assets/tv.png">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
    <v-content>
        <router-view />
    </v-content>
    <v-footer inset app>
      <span class="px-3">Made with <v-icon small color="red">favorite</v-icon>&nbsp;by StangLab</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({

  })
}
</script>

<style lang="sass">
.tile
  margin: 10px 0
</style>
