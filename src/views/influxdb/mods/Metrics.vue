<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="3">
              <info-card title="CPU Usage">
                <v-row dense>
                  <v-container fluid>
                    <v-row justify="center">
                      <v-progress-circular
                        :rotate="-90"
                        :size="150"
                        :width="4"
                        :value="cpuPercent"
                        :color="getLoadProgress(cpuPercent)"
                      >
                        <div class="font-weight-black headline white--text">
                          {{ cpuPercent || 0 }}
                        </div>
                        <span class="ml-1 white--text">%</span>
                      </v-progress-circular>
                    </v-row>
                  </v-container>

                  <v-row no-gutters class="mt-4" justify="center">
                    <v-col cols="6">
                      <v-row no-gutters justify="center">
                        <v-col cols="12" class="text-center">
                          <span class="caption text-center">Usage</span>
                        </v-col>
                        <v-col cols="12" class="text-center">
                          <div class="title font-weight-black">
                            {{ cpuUsage | cpu }}
                            <span class="caption font-weight-black">m</span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row no-gutters justify="center">
                        <v-col cols="12" class="text-center">
                          <span class="caption">Limit</span>
                        </v-col>
                        <v-col cols="12" class="text-center">
                          <div class="title font-weight-black">
                            {{ cpuLimit | cpu }}
                            <span class="caption font-weight-black">m</span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </info-card>
            </v-col>

            <v-col cols="3">
              <info-card title="Memory Usage">
                <v-row dense>
                  <v-container fluid>
                    <v-row justify="center">
                      <v-progress-circular
                        :rotate="-90"
                        :size="150"
                        :width="4"
                        :value="memoryPercent"
                        :color="getLoadProgress(memoryPercent)"
                      >
                        <div class="font-weight-black headline white--text">
                          {{ memoryPercent || 0 }}
                        </div>
                        <span class="ml-1 white--text">%</span>
                      </v-progress-circular>
                    </v-row>
                  </v-container>

                  <v-row no-gutters class="mt-4" justify="center">
                    <v-col cols="6">
                      <v-row no-gutters justify="center">
                        <v-col cols="12" class="text-center">
                          <span class="caption text-center">Usage</span>
                        </v-col>
                        <v-col cols="12" class="text-center">
                          <div class="title font-weight-black">
                            {{ memoryUsage | mem }}
                            <span class="caption font-weight-blsack">MB</span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row no-gutters justify="center">
                        <v-col cols="12" class="text-center">
                          <span class="caption">Limit</span>
                        </v-col>
                        <v-col cols="12" class="text-center">
                          <div class="title font-weight-black">
                            {{ memoryLimit | mem }}
                            <span class="caption font-weight-black">MB</span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </info-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- <v-col cols="12">
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Volume
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          {{ volumeClaim }}
        </v-col> -->
        <v-col cols="6">
          <AreaChart
            title="Recent CPU Percentage"
            name="influxdb-cpu"
            unit="%"
            :data="dbCPUMetricRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent Memory Percentage"
            name="influxdb-mem"
            unit="%"
            :data="dbMemMetricRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent FS Usage"
            name="influxdb-fs"
            unit="MB"
            :data="dbFsMetricRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent Thread Usage"
            name="influxdb-thread"
            unit=""
            :data="dbThreadMetricRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent Network Transmit"
            name="influxdb-network-transmit"
            unit="k"
            :data="dbNetworkTransmitRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent Network Receive"
            name="influxdb-network-receive"
            unit="k"
            :data="dbNetworkReceiveRange"
          ></AreaChart>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VolumeHandler from '@/handler/volumeHandler';
import { Pod, VolumeClaim, Metrics } from '@/types/backend';
import PodHandler from '@/handler/podHandler';
import { cpuUsage, memUsage } from '@/utils/convert';
import { loadProgress } from '@/utils/progress';
import PromHandler from '@/handler/promHandler';
import { Query } from '@/types/prom';

import AreaChart from '@/components/AreaChart.vue';

@Component({
  components: {
    AreaChart
  }
})
export default class InfluxDBMetrics extends Vue {
  volumeClaim: VolumeClaim = new VolumeClaim();
  dbPod: Pod = new Pod();
  dbPodMetrics: Metrics[] = [];

  dbCPUMetricRange: (string | number)[][] = [];
  dbMemMetricRange: (string | number)[][] = [];
  dbFsMetricRange: (string | number)[][] = [];
  dbThreadMetricRange: (string | number)[][] = [];
  dbNetworkTransmitRange: (string | number)[][] = [];
  dbNetworkReceiveRange: (string | number)[][] = [];

  timer = 0;

  cpuLimit = '';
  memoryLimit = '';
  cpuUsage = '';
  memoryUsage = '';

  async getVolumeClaimList() {
    this.volumeClaim = await VolumeHandler.getOneVolumeClaim(
      this.namespace,
      this.dbPod.spec.volumes[0]?.persistentVolumeClaim.claimName
    );
  }

  async getCurrentDbPod() {
    try {
      this.dbPod = await PodHandler.getOnePod(this.namespace, this.name);
    } catch (_) {
      this.$snack('Pod temporarily unavailable');
    }

    this.cpuLimit = this.dbPod.spec.containers[0]?.resources?.limits?.cpu;
    this.memoryLimit = this.dbPod.spec.containers[0]?.resources?.limits?.memory;
  }

  async getPodMetrics() {
    try {
      this.dbPodMetrics = await PodHandler.getOnePodMetrics(
        this.namespace,
        this.name
      );

      this.cpuUsage = this.dbPodMetrics[0]?.usage?.cpu;
      this.memoryUsage = this.dbPodMetrics[0]?.usage?.memory;
    } catch (_) {
      this.$snack('Metrics temporarily unavailable');
    }
  }

  async getMetricRange() {
    const q = new Query();
    q.container = 'dim-edge-influxdb';
    q.pod = this.dbPod.metadata.name;
    q.duration = '5m';

    this.dbCPUMetricRange = (
      await PromHandler.getCPUPercentageRange(q)
    )[0].values.map((e) => [e[0], Number(e[1]) * 100]);
    this.dbMemMetricRange = (
      await PromHandler.getMemUsageRange(q)
    )[0].values.map((e) => [e[0], (Number(e[1]) / 1000000 / 50) * 100]);
    this.dbFsMetricRange = (
      await PromHandler.getFsUsageRange(q)
    )[0].values.map((e) => [e[0], Number(e[1]) / 1000000]);
    this.dbThreadMetricRange = (
      await PromHandler.getThreadUsageRange(q)
    )[0].values;
    this.dbNetworkTransmitRange = (
      await PromHandler.getNetworkTransmitRange(q)
    )[0].values.map((e) => [e[0], Number(e[1]) / 1000]);
    this.dbNetworkReceiveRange = (
      await PromHandler.getNetworkReceiveRange(q)
    )[0].values.map((e) => [e[0], Number(e[1]) / 1000]);
  }

  getLoadProgress(v: number) {
    return loadProgress(v);
  }

  get name() {
    return this.$route.params.name;
  }

  get namespace() {
    return String(this.$route.query.namespace);
  }

  get cpuPercent() {
    if (this.cpuLimit && this.cpuUsage) {
      return (
        (100 * Number(cpuUsage(this.cpuUsage))) /
        Number(cpuUsage(this.cpuLimit))
      ).toFixed(2);
    }
    return 0;
  }

  get memoryPercent() {
    if (this.memoryLimit && this.memoryUsage) {
      return (
        (100 * Number(memUsage(this.memoryUsage))) /
        Number(memUsage(this.memoryLimit))
      ).toFixed(2);
    } else {
      return 0;
    }
  }

  async mounted() {
    await this.getCurrentDbPod();
    this.getVolumeClaimList();
    this.getPodMetrics();
    this.getMetricRange();
    this.timer = setInterval(() => {
      this.getPodMetrics();
      this.getMetricRange();
    }, 10000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped></style>
