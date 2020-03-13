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
                      {{ replicaSet.status.readyReplicas }}
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
                      {{ replicaSet.status.replicas }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </info-card>
        </v-col>
      </v-row>
      <v-toolbar dense class="transparent" flat>
        <v-toolbar-title class="subtitle-1 font-weight-black"
          >ReplicaSets</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <!-- <v-btn outlined @click="scaleDialog = true"
          ><v-icon size="20" class="mr-2">mdi-contrast</v-icon>Scale</v-btn
        > -->
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12">
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
            <template v-slot:item.hostIP="{ item }">
              {{ item.status.hostIP }}
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
            <template v-slot:item.action="{ item }">
              <v-btn
                class="mr-1"
                icon
                small
                :to="{
                  path: `/edgenode/${item.metadata.name}`,
                  query: $route.query
                }"
                ><v-icon size="20">mdi-information-outline</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pod, ReplicaSet } from '@/types/backend';
import PodHandler from '@/handler/podHandler';
import ReplicaSetHandler from '@/handler/replicaSetHandler';

@Component
export default class NodeView extends Vue {
  dbPodList: Pod[] = [];
  replicaSet: ReplicaSet = new ReplicaSet();

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
        text: 'Host IP',
        value: 'hostIP'
      },
      {
        text: 'Pod IP',
        value: 'podIP'
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
      'dim-edge-node'
    );
  }

  async getReplicaSet() {
    this.replicaSet =
      (
        await ReplicaSetHandler.getReplicaSetList('default', 'dim-edge-node')
      )[0] || new ReplicaSet();
  }

  get readyReplicas() {
    return (
      (100 * (this.replicaSet.status.readyReplicas || 0)) /
      (this.replicaSet.status.replicas || 1)
    ).toFixed(2);
  }

  mounted() {
    this.getPodList();
    this.getReplicaSet();
  }
}
</script>

<style scoped></style>
