<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Volume
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          {{ volumeClaimList }}
        </v-col>
        <v-col cols="12">
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Performance
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-row dense>
              <v-col
                cols="6"
                v-for="(item, i) in dbPodMetrics"
                :key="`metrics-${i}`"
              >
                <v-row no-gutters>
                  <v-col cols="6">
                    <info-card title="CPU Usage">
                      {{ item.usage.cpu | cpu }} m
                    </info-card>
                  </v-col>
                  <v-col cols="6">
                    <info-card title="Memory Usage">
                      {{ item.usage.memory | mem }} MB
                    </info-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <div></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VolumeHandler from '@/handler/volumeHandler';
import { Pod, VolumeClaim } from '@/types/backend';
import PodHandler from '@/handler/podHandler';

@Component
export default class InfluxDBInfoView extends Vue {
  volumeClaimList: VolumeClaim[] = [];
  dbPod: Pod = new Pod();
  dbPodMetrics: any = {};
  timer = 0;

  async getVolumeClaimList() {
    this.volumeClaimList = await VolumeHandler.getVolumeClaimList(
      this.namespace,
      this.name
    );
  }

  async getCurrentDbPod() {
    this.dbPod = await PodHandler.getOnePod(this.namespace, this.name);
  }

  async getPodMetrics() {
    try {
      this.dbPodMetrics = await PodHandler.getOnePodMetrics(
        this.namespace,
        this.name
      );
    } catch (_) {
      console.log('metrics not available');
    }
  }

  get name() {
    return this.$route.params.name;
  }

  get namespace() {
    return String(this.$route.query.namespace);
  }

  mounted() {
    this.getVolumeClaimList();
    this.getCurrentDbPod();

    this.getPodMetrics();
    this.timer = setInterval(this.getPodMetrics, 10000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped></style>
