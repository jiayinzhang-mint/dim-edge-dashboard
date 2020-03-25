<template>
  <div>
    <v-container fluid v-if="!canSetup">
      <v-row dense>
        <v-col cols="12">
          <v-row no-gutters> </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row style="height:calc(100vh - 96px)" justify="center" align="center">
        <v-card class="transparent" flat>
          <v-row justify="center">
            <div class="display-2 font-weight-thin">
              😤 This InfluxDB has not been setuped
            </div>
          </v-row>
          <v-row justify="center" class="mt-10">
            <v-btn outlined rounded>Setup Now</v-btn>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InfluxDBHandler from '@/handler/influxdbHandler';

@Component
export default class InfluxDBQuery extends Vue {
  canSetup = false;

  async checkSetup() {
    this.canSetup = await InfluxDBHandler.checkSetup();
  }

  mounted() {
    this.checkSetup();
  }
}
</script>

<style scoped></style>
