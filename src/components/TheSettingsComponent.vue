<template>
  <v-layout no-gutters
            row>
    <v-flex sm12>
      <h1 class="headline pa-2">
        Settings
      </h1>
    </v-flex>
    <v-flex sm12>
      <v-tabs vertical>
        <v-tab>
          Searchers
        </v-tab>
        <v-tab-item>
          <v-flex
            class="d-flex flex-row align-center">
            <h2>
              The Movie Database
            </h2>
            <v-spacer />
            <v-switch v-model="tmdbApiEnabled"
                      inset />
          </v-flex>
          <v-flex v-if="tmdbApiEnabled">
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
              <v-col cols="24"
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
          </v-flex>
        </v-tab-item>
        <v-tab>
          Backups
        </v-tab>
        <v-tab-item>
          <v-flex class="d-flex flex-row align-center">
            <h2>
              Download <span class="subtitle-1 font-weight-medium yellow--text">(Coming Soon)</span>
            </h2>
            <v-spacer />
            <v-switch
              inset
              disabled />
          </v-flex>
          <v-flex class="d-flex flex-row align-center">
            <h2>
              Cloud Storage <span class="subtitle-1 font-weight-medium yellow--text">(Coming Soon)</span>
            </h2>
            <v-spacer />
            <v-switch
              inset
              disabled />
          </v-flex>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
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
    },
    tmdbApiEnabled: {
      get() {
        return this.$store.state.tmdbApiEnabled;
      },
      set(value) {
        this.$store.dispatch("tmdbApiEnabled", value);
      }
    },
  }
});
</script>
