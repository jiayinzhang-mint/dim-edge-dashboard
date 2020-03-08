<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="transparent"
      :elevation="hover ? 12 : 0"
      ripple
      outlined
      flat
      height="100%"
    >
      <v-card-title class="body-2 font-weight-black primary--text">{{
        title
      }}</v-card-title>
      <v-card-text class="white--text"><slot></slot></v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoCard extends Vue {
  @Prop() title!: string;
}
</script>

<style scoped></style>ojb
