<template>
  <div>
    <v-data-table
      class="transparent"
      disable-sort
      disable-filtering
      :headers="headers"
      :items="podList"
    >
      <template v-slot:item.name="{ item }">
        {{ item.metadata.name }}
      </template>
      <template v-slot:item.namespace="{ item }">
        {{ item.metadata.namespace }}
      </template>

      <template v-slot:item.created="{ item }">
        {{ item.metadata.creationTimestamp | format('yyyy-MM-dd hh:mm:ss') }}
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
          :to="{ path: `/pod/${item.metadata.name}`, query: $route.query }"
          ><v-icon size="20">mdi-information-outline</v-icon></v-btn
        >
        <v-btn icon small color="error"
          ><v-icon size="20">mdi-delete-outline</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import PodHandler from '@/handler/podHandler';
import { Pod } from '@/types/backend';

@Component
export default class PodView extends Vue {
  podList: Pod[] = [];

  async getPodList() {
    this.podList = await PodHandler.getPodList(this.namespace);
  }

  get namespace() {
    return String(this.$route.query.namespace);
  }

  get headers() {
    return [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Namespace',
        value: 'namespace',
      },
      {
        text: 'Created',
        value: 'created',
      },
      {
        text: 'Host IP',
        value: 'hostIP',
      },
      {
        text: 'Pod IP',
        value: 'podIP',
      },
      {
        text: 'Actions',
        value: 'action',
      },
    ];
  }

  @Watch('namespace')
  onNamespaceChanged() {
    this.getPodList();
  }

  mounted() {
    this.getPodList();
  }
}
</script>

<style scoped></style>
