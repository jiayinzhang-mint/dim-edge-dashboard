<template>
  <div>
    <v-container fluid v-if="!canSetup">
      <v-row dense>
        <v-col cols="3">
          <v-row dense>
            <v-toolbar flat color="transparent" dense>
              <v-toolbar-title class="subtitle-1 font-weight-black"
                >Buckets</v-toolbar-title
              >
            </v-toolbar>
            <v-col
              cols="12"
              v-for="(item, i) in bucketList"
              :key="`bucket-${i}`"
            >
              <info-card :title="item.name" flat color="transparent">
                <slot>
                  <div>{{ item.type }}</div>
                  <div>{{ item.createdAt | format('MM-dd hh:mm:ss') }}</div>
                </slot>
              </info-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9">
          <v-toolbar flat color="transparent">
            <v-text-field
              flat
              dense
              solo-inverted
              label="Query"
              v-model="query"
              hide-details
            ></v-text-field>
            <v-btn outlined class="ml-3">
              <v-icon>mdi-play-outline</v-icon>
            </v-btn>
          </v-toolbar>
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
        <v-form ref="setupForm">
          <dim-form
            :content="setupFormContent"
            :target="setupParams"
            dense
          ></dim-form>
        </v-form>
      </v-container>
    </input-dialog>

    <input-dialog
      :confirmFunc="signIn"
      width="400"
      :open.sync="shouldSignIn"
      :persistant="true"
      :noExit="true"
      :okText="`sign in`"
      title="Sign in"
    >
      <v-container fluid>
        <v-form ref="signInForm">
          <dim-form
            :content="signInFormContent"
            :target="signInParams"
            dense
          ></dim-form>
        </v-form>
      </v-container>
    </input-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InfluxDBHandler from '@/handler/influxdbHandler';

import { Setup, SignIn, Bucket } from '@/types/influxdb';
import { setupForm, signInForm } from '@/form/influxdb';

@Component
export default class InfluxDBQuery extends Vue {
  canSetup = false;
  setupParams = new Setup();
  setupDialog = false;

  signInParams = new SignIn();
  shouldSignIn = false;

  bucketList: Bucket[] = [];

  query = '';

  async checkSetup() {
    this.canSetup = await InfluxDBHandler.checkSetup();
  }

  async setup() {
    if ((this.$refs.setupForm as any).validate()) {
      try {
        this.setupParams.retentionPeriodHrs = Number(
          this.setupParams.retentionPeriodHrs
        );
        await InfluxDBHandler.setup(this.setupParams);
        this.$snack('Setup succeeded', { color: 'success' });
      } catch (_) {
        this.$snack('Setup failed', { color: 'error' });
      }
      this.setupDialog = false;
    }
  }

  async signIn() {
    if ((this.$refs.signInForm as any).validate()) {
      try {
        await InfluxDBHandler.signIn(this.signInParams);
        this.$snack('Sign in succeeded', { color: 'success' });
        this.shouldSignIn = false;
      } catch (_) {
        this.$snack('Sign in failed', { color: 'error' });
      }
    }
  }

  async signOut() {
    try {
      await InfluxDBHandler.signOut();
      this.$snack('Sign out succeeded', { color: 'success' });
    } catch (_) {
      this.$snack('Sign out failed', { color: 'error' });
    }
  }

  async getBucketList() {
    try {
      this.bucketList = await InfluxDBHandler.getBucketList({
        page: 1,
        size: 100,
      });
    } catch (_) {
      this.$snack('Get buckets failed', { color: 'error' });
    }
  }

  get setupFormContent() {
    return setupForm;
  }

  get signInFormContent() {
    return signInForm;
  }

  async mounted() {
    this.checkSetup();

    if (!this.canSetup) {
      // check sign in
      try {
        await InfluxDBHandler.getAuthorization({ user: 'mint' });
        await this.getBucketList();
      } catch (err) {
        if (err === 401) {
          // force to sign in
          this.$snack('Authorization has expired', { color: 'error' });
          this.shouldSignIn = true;
        }
      }
    }
  }
}
</script>

<style scoped></style>
