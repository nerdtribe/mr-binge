<template>
  <v-card color="gray lighten-1">
    <v-card-title class="headline blue-grey darken-1" primary-title>
      <h1>movie title</h1>
      <p>34% (3234)</p>
    </v-card-title>

    <v-card-text>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At porro quidem neque velit aperiam magni maiores autem earum vel dolore illo dignissimos nisi culpa laborum doloremque quas, quasi repellendus error.</p>
    </v-card-text>
    <youtube :video-id="videoId"></youtube>

  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    videoId: 'u9Mv98Gr5pY'
  }),
  methods: {

  }
}
</script>

<style lang="sass">

</style>
