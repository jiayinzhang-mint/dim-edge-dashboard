<template>
  <v-row no-gutters>
    <v-col cols="5" style="height: calc(100vh - 48px);" class="overflow-y-auto">
      <v-list flat color="transparent">
        <div v-for="(item, i) in alert" :key="`al-${i}`">
          <v-list-item two-line @click="currentAlert = item">
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-black mb-2">
                <v-icon
                  color="orange darken-2"
                  size="10"
                  v-if="item.Labels.severity == 'warning'"
                  >mdi-moon-full</v-icon
                >
                <v-icon
                  color="red darken-2"
                  size="10"
                  v-else-if="item.Labels.severity == 'critical'"
                  >mdi-moon-full</v-icon
                >
                <v-icon color="grey darken-2" size="10" v-else
                  >mdi-moon-full</v-icon
                >

                {{ item.Labels.service || `system` }}</v-list-item-subtitle
              >
              <v-list-item-title class="body-2">
                {{ item.Labels.alertname }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action-text>
              {{ item.activeAt | format('hh:mm:ss') }}
            </v-list-item-action-text>
            <v-list-item-action-text class="ml-3">
              <v-chip outlined small>{{ item.State }}</v-chip>
            </v-list-item-action-text>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-col>
    <v-col cols="7">
      <v-card
        style="height: calc(100vh - 48px);"
        class="overflow-y-auto transparent elevation-12"
      >
        <v-container fluid>
          <pre>{{ currentAlert }}</pre>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PromHandler from '@/handler/promHandler';
import { Alert } from '@/types/prom';

@Component
export default class AlertView extends Vue {
  alert: Alert[] = [];
  currentAlert: Alert = new Alert();

  async mounted() {
    this.alert = await PromHandler.getAlert();
  }
}
</script>

<style scoped>
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
