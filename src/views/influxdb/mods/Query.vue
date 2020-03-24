<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="3">
              <info-card title="Setup">
                <v-container fluid>
                  {{ setup }}
                </v-container>
              </info-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InfluxDBHandler from '@/handler/influxdbHandler';

@Component
export default class InfluxDBQuery extends Vue {
  setup = false;

  async checkSetup() {
    this.setup = await InfluxDBHandler.checkSetup();
  }

  mounted() {
    this.checkSetup();
  }
}
</script>

<style scoped></style>
