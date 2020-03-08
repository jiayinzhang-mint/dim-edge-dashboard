<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="3">
          <info-card title="CPU Usage">
            <v-container fluid>
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="4"
                  :value="cpuLoadPercent"
                  color="primary"
                >
                  <div class="font-weight-black headline white--text">
                    {{ cpuLoadPercent }}
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
                      {{ metrics.usage.cpu | cpu }} m
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
                      {{ minikubeNode.status.allocatable.cpu * 1000 }} m
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
                  color="primary"
                >
                  <div class="font-weight-black headline white--text">
                    {{ memoryLoadPercent }}
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
                      {{ metrics.usage.memory | mem }} MB
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
                      {{ minikubeNode.status.allocatable.memory | mem }} MB
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </info-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NodeHandler from '@/handler/nodeHandler';
import { Metrics, K8SNode } from '@/types/backend';

@Component
export default class DashboardView extends Vue {
  metrics: Metrics = new Metrics();
  minikubeNode: K8SNode = new K8SNode();

  async getMetrics() {
    this.metrics = await NodeHandler.getOneNodeMetrics('minikube');
  }

  async getNode() {
    this.minikubeNode = await NodeHandler.getOneNode('minikube');
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

  async mounted() {
    this.getMetrics();
    this.getNode();
  }
}
</script>

<style scoped></style>
