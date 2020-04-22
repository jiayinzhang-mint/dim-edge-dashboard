<template>
  <v-snackbar :timeout="2000" top value="true" :color="color">
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    color: {
      type: String,
      default: 'grey darken-3',
    },

    message: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style></style>
