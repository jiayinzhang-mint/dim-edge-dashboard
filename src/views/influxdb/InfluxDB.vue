<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="3">
          <info-card title="Replicas">
            <v-container fluid>
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="4"
                  :value="readyReplicas"
                  color="primary"
                >
                  <div class="font-weight-black headline white--text">
                    {{ readyReplicas || 0 }}
                  </div>
                  <span class="ml-1 white--text">%</span>
                </v-progress-circular>
              </v-row>
            </v-container>

            <v-row no-gutters class="mt-4" justify="center">
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    <span class="caption text-center">Ready</span>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="title font-weight-black">
                      {{ statefulSet.status.readyReplicas }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    <span class="caption">All</span>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="title font-weight-black">
                      {{ statefulSet.status.replicas }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </info-card>
        </v-col>
        <v-col cols="9">
          <v-row no-gutters>
            <v-col cols="4">
              <info-card title="Observed generation">
                <div class="title font-weight-black">
                  {{ statefulSet.status.observedGeneration }}
                </div>
              </info-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-toolbar dense class="transparent" flat>
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >Pods</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn outlined @click="scaleDialog = true"
              ><v-icon size="20" class="mr-2">mdi-contrast</v-icon>Scale</v-btn
            >
          </v-toolbar>
          <v-data-table
            class="transparent"
            disable-sort
            disable-filtering
            :headers="headers"
            :items="dbPodList"
          >
            <template v-slot:item.name="{ item }">
              {{ item.metadata.name }}
            </template>
            <template v-slot:item.namespace="{ item }">
              {{ item.metadata.namespace }}
            </template>

            <template v-slot:item.created="{ item }">
              {{
                item.metadata.creationTimestamp | format('yyyy-MM-dd hh:mm:ss')
              }}
            </template>
            <template v-slot:item.podIP="{ item }">
              {{ item.status.podIP }}
            </template>
            <template v-slot:item.port="{ item }">
              <v-chip
                class="mr-2 font-weight-black"
                v-for="p in item.spec.ports"
                :key="p.nodePort"
                small
              >
                {{ p.port }} : {{ p.targetPort }} : {{ p.nodePort }}
              </v-chip>
            </template>
            <template v-slot:item.phase="{ item }">
              <v-chip
                :color="phaseColor(item.status.phase)"
                small
                class="font-weight-black"
              >
                {{ item.status.phase }}</v-chip
              >
            </template>
            <template v-slot:item.condition="{ item }">
              <div
                v-if="
                  item.status.conditions[0] &&
                    item.status.conditions[0].status == 'True'
                "
              >
                <v-chip class="font-weight-black" small color="success"
                  >True</v-chip
                >
              </div>
              <div
                v-if="
                  item.status.conditions[0] &&
                    item.status.conditions[0].status == 'False'
                "
              >
                <v-chip
                  class="font-weight-black"
                  small
                  color="error darken-1"
                  >{{ item.status.conditions[0].message }}</v-chip
                >
              </div>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                v-if="item.status.phase == 'Running'"
                class="mr-1"
                icon
                small
                :to="{
                  path: `/influxdb/${item.metadata.name}`,
                  query: $route.query
                }"
                ><v-icon size="20">mdi-information-outline</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <input-dialog
      :confirmFunc="scaleStatefulSet"
      width="400"
      :open.sync="scaleDialog"
      title="Scale"
    >
      <v-container fluid>
        <v-text-field
          background-color="rgba(0,0,0,0.4)"
          solo
          dense
          prepend-icon="mdi-minus"
          @click:prepend="updateReplicasNum(-1)"
          @click:append-outer="updateReplicasNum(1)"
          append-outer-icon="mdi-plus"
          v-model="targetScale.spec.replicas"
          flat
          type="number"
          label="Replicas"
        ></v-text-field>
      </v-container>
    </input-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pod, StatefulSet, Scale } from '@/types/backend';
import PodHandler from '@/handler/podHandler';
import StatefulSetHandler from '@/handler/statefulSetHandler';

@Component
export default class InfluxDBView extends Vue {
  dbPodList: Pod[] = [];
  statefulSet: StatefulSet = new StatefulSet();
  scaleDialog = false;
  targetScale: Scale = new Scale();
  timer = 0;

  get namespace() {
    return String(this.$route.query.namespace);
  }

  get headers() {
    return [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Namespace',
        value: 'namespace'
      },
      {
        text: 'Created',
        value: 'created'
      },
      {
        text: 'Pod IP',
        value: 'podIP'
      },
      {
        text: 'Phase',
        value: 'phase'
      },
      {
        text: 'Latest condition',
        value: 'condition'
      },
      {
        text: 'Actions',
        value: 'action'
      }
    ];
  }

  async getPodList() {
    this.dbPodList = await PodHandler.getPodList(
      this.namespace,
      'dim-edge-influxdb'
    );
    this.targetScale.spec.replicas = this.dbPodList.length;
  }

  async getStatefulSet() {
    this.statefulSet = await StatefulSetHandler.getOneStatefulSet(
      this.namespace,
      'dim-edge-influxdb'
    );
    this.targetScale.spec.replicas = this.statefulSet.spec.replicas || 1;
  }

  async scaleStatefulSet() {
    this.scaleDialog = false;
    this.targetScale.metadata.namespace = this.namespace;
    this.targetScale.metadata.name = 'dim-edge-influxdb';
    await StatefulSetHandler.updateStatefulSetScale(this.targetScale);
    this.getPodList();
  }

  updateReplicasNum(v: number) {
    if (v == -1) {
      if (this.targetScale.spec.replicas > 1)
        this.targetScale.spec.replicas -= 1;
    } else if (v == +1) {
      this.targetScale.spec.replicas += 1;
    }
  }

  phaseColor(v: string) {
    if (v == 'Running') {
      return 'success';
    } else if (v == 'Pending') {
      return 'primary darken-1';
    } else if (v == 'Succeeded') {
      return 'grey';
    } else if (v == 'Failed') {
      return 'error';
    } else if (v == 'Unknown') {
      return 'warning';
    }
  }

  get readyReplicas() {
    return (
      (100 * (this.statefulSet.status.readyReplicas || 0)) /
      (this.statefulSet.status.replicas || 1)
    ).toFixed(2);
  }

  mounted() {
    this.getPodList();
    this.getStatefulSet();
    this.timer = setInterval(() => {
      this.getPodList();
      this.getStatefulSet();
    }, 10000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped></style>
