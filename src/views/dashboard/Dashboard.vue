<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="3">
          <info-card title="CPU Usage">
            <v-container fluid>
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="4"
                  :value="cpuLoadPercent"
                  :color="getLoadProgress(cpuLoadPercent)"
                >
                  <div class="font-weight-black headline">
                    {{ cpuLoadPercent || 0 }}
                  </div>
                  <span class="ml-1">%</span>
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
                      {{ metrics.usage.cpu | cpu }}
                      <span class="caption font-weight-black">m</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    <span class="caption">Annotation</span>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="title font-weight-black">
                      {{ minikubeNode.status.allocatable.cpu * 1000 }}
                      <span class="caption font-weight-black">m</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </info-card>
        </v-col>
        <v-col cols="3">
          <info-card title="Memory Usage">
            <v-container fluid>
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="4"
                  :value="memoryLoadPercent"
                  :color="getLoadProgress(memoryLoadPercent)"
                >
                  <div class="font-weight-black headline">
                    {{ memoryLoadPercent || 0 }}
                  </div>
                  <span class="ml-1">%</span>
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
                      {{ metrics.usage.memory | mem }}
                      <span class="caption font-weight-black">MB</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    <span class="caption">Annotation</span>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="title font-weight-black">
                      {{ minikubeNode.status.allocatable.memory | mem }}
                      <span class="caption font-weight-black">MB</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </info-card>
        </v-col>
      </v-row>

      <v-row dense class="mt-3">
        <v-col cols="6">
          <AreaChart
            title="Recent CPU Usage"
            name="system-cpu"
            unit="%"
            :data="cpuMetricRange"
          ></AreaChart>
        </v-col>
        <v-col cols="6">
          <AreaChart
            title="Recent Memory Usage"
            name="system-memory"
            unit="GB"
            :data="memoryMetricRange"
          ></AreaChart>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-toolbar dense class="transparent" flat>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >Conditions</v-toolbar-title
          >
        </v-toolbar>

        <v-col cols="12">
          <v-data-table
            class="transparent"
            disable-sort
            disable-filtering
            :headers="conditionHeaders"
            :items="minikubeNode.status.conditions"
          >
            <template v-slot:item.lastHeartbeatTime="{ item }">
              {{ item.lastHeartbeatTime | format('yyyy-MM-dd hh:mm:ss') }}
            </template>
            <template v-slot:item.lastTransitionTime="{ item }">
              {{ item.lastTransitionTime | format('yyyy-MM-dd hh:mm:ss') }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NodeHandler from '@/handler/nodeHandler';
import { Metrics, K8SNode } from '@/types/backend';
import { loadProgress } from '@/utils/progress';
import PromHandler from '@/handler/promHandler';
import { Query } from '@/types/prom';

import AreaChart from '@/components/AreaChart.vue';

@Component({
  components: { AreaChart },
})
export default class DashboardView extends Vue {
  metrics: Metrics = new Metrics();
  minikubeNode: K8SNode = new K8SNode();
  timer = 0;

  memoryMetricRange: (string | number)[][] = [];
  cpuMetricRange: (string | number)[][] = [];

  async getMetrics() {
    this.metrics = await NodeHandler.getOneNodeMetrics('minikube');
  }

  async getNode() {
    this.minikubeNode = await NodeHandler.getOneNode('minikube');
  }

  async getMemoryRange() {
    const q = new Query();
    q.id = '/';
    this.memoryMetricRange = (
      await PromHandler.getMemUsageRange(q)
    )[0].values.map((e) => [e[0], Number(e[1]) / 1000000000]);

    this.cpuMetricRange = (
      await PromHandler.getSystemCPUPercentageRange(q)
    )[0].values.map((e) => [e[0], e[1]]);
  }

  get cpuLoadPercent() {
    return (
      (100 * Number(this.metrics.usage.cpu?.slice(0, -1))) /
      1000000000 /
      Number(this.minikubeNode.status.allocatable.cpu)
    ).toFixed(2);
  }

  get memoryLoadPercent() {
    return (
      (100 * Number(this.metrics.usage.memory?.slice(0, -2))) /
      Number(this.minikubeNode.status.allocatable.memory?.slice(0, -2))
    ).toFixed(2);
  }

  get conditionHeaders() {
    return [
      {
        text: 'Type',
        value: 'type',
      },
      {
        text: 'Status',
        value: 'status',
      },
      {
        text: 'Last heartbeat Time',
        value: 'lastHeartbeatTime',
      },
      {
        text: 'Last transition Time',
        value: 'lastTransitionTime',
      },
      {
        text: 'Message',
        value: 'message',
      },
    ];
  }

  getLoadProgress(v: number) {
    return loadProgress(v);
  }

  async mounted() {
    this.getMetrics();
    this.getNode();
    this.getMemoryRange();

    this.timer = setInterval(() => {
      this.getMetrics();
      this.getNode();
      this.getMemoryRange();
    }, 10000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped></style>
