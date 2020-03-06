<template>
  <div>
    <v-data-table
      class="transparent"
      disable-sort
      disable-filtering
      :headers="headers"
      :items="serviceList"
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
      <template v-slot:item.IP="{ item }">
        {{ item.spec.clusterIP }}
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
          :to="{ path: `/service/${item.metadata.name}`, query: $route.query }"
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
import { Service } from '@/types/backend';
import ServiceHandler from '@/handler/serviceHandler';

@Component
export default class ServiceView extends Vue {
  serviceList: Service[] = [];

  async getServiceList() {
    this.serviceList = await ServiceHandler.getServiceList(this.namespace);
  }

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
        text: 'IP',
        value: 'IP'
      },
      {
        text: 'Ports',
        value: 'port'
      },
      {
        text: 'Actions',
        value: 'action'
      }
    ];
  }

  @Watch('namespace')
  onNamespaceChanged() {
    this.getServiceList();
  }

  mounted() {
    this.getServiceList();
  }
}
</script>

<style scoped></style>
