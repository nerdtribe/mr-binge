<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-flex>

      <v-flex mb-4>
        <h2 class="display-2 font-weight-bold mb-3">Return from the store!</h2>
        <v-text-field id="apiInput" label="API Key" v-model="apiKeyInput" data-apiKey></v-text-field>
        <v-btn id="saveBtn" v-on:click="saveApiKey()">Save API Key</v-btn>
        <p id="apiKey">API Key: {{apiKey}}</p>
        <li v-for="movie in movies" v-bind:key="movie.id">
          title: {{movie.title}}
          <br />
        </li>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'HelloWorld',
  data: () => ({
    apiKeyInput: '',
  }),
  computed: mapState(['apiKey', 'movies']),
  methods: {
    ...mapActions(['addApiKey']),
    saveApiKey() {
      this.addApiKey(this.apiKeyInput.trim());
      this.apiKeyInput = '';
    },
  },
});
</script>
