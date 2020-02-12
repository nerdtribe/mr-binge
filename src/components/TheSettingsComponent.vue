<template>
  <v-card height="100%">
    <h1 class="headline pa-4">
      Settings
    </h1>
    <v-divider />
    <v-tabs vertical
            background-color="secondary"
            class="pa-2"
            height="100%">
      <v-tab>
        Media Sources
      </v-tab>
      <v-tab-item>
        <v-form>
          <v-container>
            <h2>The Movie Database</h2>
            <ol>
              <li>
                Create a
                <a href="https://www.themoviedb.org/account/signup"
                   target="_blank">TMDB account</a>.
              </li>
              <li>
                Request an API key found in <a href="https://www.themoviedb.org/settings/api"
                                               target="_blank">account settings</a>.
              </li>
              <li>Paste API key below.</li>
            </ol>
            <v-row>
              <v-col cols="12"
                     sm="6"
                     md="3">
                <v-text-field
                  v-model="tmdbApiKey"
                  label="TMDB API Key"
                  :append-icon="showApi ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showApi ? 'text' : 'password'"
                  filled
                  @click:append="showApi = !showApi" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-tab-item>
      <v-tab>
        Media Sources
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheSettingsComponent",
  data: () => ({
    showApi: false,
  }),
  computed: {
    tmdbApiKey: {
      get() {
        return this.$store.state.tmdbApiKey;
      },
      set(value) {
        this.$store.dispatch("tmdbApiKey", value);
      }
    }
  }
});
</script>
