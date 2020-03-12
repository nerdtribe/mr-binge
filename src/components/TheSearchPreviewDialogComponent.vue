<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="ma-0">
      <v-card-title class="headline">
        Frozen II <span class="caption mt-2 ml-2"> (2019)</span>
      </v-card-title>
      <v-toolbar flat
                 class="mb-2">
        <v-rating
          :value="3"
          background-color="white"
          color="yellow accent-4"
          dense
          half-increments
          readonly
          size="24" />
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-progress-circular :value="70"
                                 :size="55"
                                 :width="8"
                                 v-on="on">
              70%
            </v-progress-circular>
          </template>
          <span>Rating via 188 votes.</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text class="d-flex align-center flex-column">
        Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.
        <div class="pa-4">
         <youtube video-id="Zi4LMpSDccc" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text
               @click="dialog = false">
          Close
        </v-btn>
        <v-btn text
               @click.once.prevent="add('id')">
          Add to Library
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheSearchPreviewDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({ }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
  methods: {
    add(id) {
      console.log(`Firing ${id}`);
      this.dialog = false;
    },
  },
});
</script>
