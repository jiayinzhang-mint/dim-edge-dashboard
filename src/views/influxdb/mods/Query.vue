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
      <v-row
        style="height: calc(100vh - 96px);"
        justify="center"
        align="center"
        no-gutters
      >
        <v-card class="transparent" flat>
          <v-row no-gutters justify="center">
            <div class="display-2 font-weight-thin">
              😤 This InfluxDB has not been setuped
            </div>
          </v-row>
          <v-row no-gutters justify="center" class="mt-10">
            <v-btn outlined rounded @click="setupDialog = true"
              >Setup Now</v-btn
            >
          </v-row>
        </v-card>
      </v-row>
    </v-container>

    <input-dialog
      :confirmFunc="setup"
      width="400"
      :open.sync="setupDialog"
      :persistant="true"
      title="Setup"
    >
      <v-container fluid>
        <dim-form
          :content="setupFormContent"
          :target="setupParams"
          dense
        ></dim-form>
      </v-container>
    </input-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InfluxDBHandler from '@/handler/influxdbHandler';

import { Setup } from '@/types/influxdb';
import { setupForm } from '@/form/influxdb';

@Component
export default class InfluxDBQuery extends Vue {
  canSetup = false;
  setupParams: Setup = new Setup();
  setupDialog = false;

  async checkSetup() {
    this.canSetup = await InfluxDBHandler.checkSetup();
  }

  async setup() {
    try {
      this.setupParams.retentionPeriodHrs = Number(
        this.setupParams.retentionPeriodHrs
      );
      await InfluxDBHandler.setup(this.setupParams);
      this.$snack('Setup succeeded');
    } catch (_) {
      this.$snack('Setup failed');
    }
    this.setupDialog = false;
  }

  get setupFormContent() {
    return setupForm;
  }

  mounted() {
    this.checkSetup();
  }
}
</script>

<style scoped></style>
