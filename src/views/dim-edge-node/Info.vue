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
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VolumeHandler from '@/handler/volumeHandler';
import { Pod, VolumeClaim } from '@/types/backend';
import PodHandler from '@/handler/podHandler';
import { loadProgress } from '@/utils/progress';
import { cpuUsage, memUsage } from '@/utils/convert';

@Component
export default class InfluxDBInfoView extends Vue {
  dbPod: Pod = new Pod();
  dbPodMetrics: any = {};
  timer = 0;

  cpuLimit = '';
  memoryLimit = '';
  cpuUsage = '';
  memoryUsage = '';

  async getCurrentDbPod() {
    this.dbPod = await PodHandler.getOnePod(this.namespace, this.name);

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
      console.log('metrics not available');
    }
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

  mounted() {
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
