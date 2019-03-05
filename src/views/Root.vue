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
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="@/assets/logo.png">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
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
    items: [
      { title: 'Movies', icon: 'movie', link: '/' },
      { title: 'TV', icon: 'live_tv', link: '/tv' }
    ]
  })
}
</script>

<style lang="sass">

</style>
