<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      @click="$emit('click')"
      class="info-card"
      :elevation="hover ? 12 : 0"
      ripple
      outlined
      flat
      height="100%"
    >
      <v-card-title
        v-if="title"
        class="body-2 font-weight-black primary--text"
        >{{ title }}</v-card-title
      >
      <v-layout fill-height v-if="button" align-center justify-center>
        <slot></slot>
      </v-layout>
      <v-card-text v-else><slot></slot></v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoCard extends Vue {
  @Prop() title!: string;
  @Prop() button!: boolean;
}
</script>

<style scoped>
.info-card {
  background: transparent;
}
</style>
