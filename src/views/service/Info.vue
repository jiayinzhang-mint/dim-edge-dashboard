<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            Metadata
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <v-col cols="3">
              <info-card title="Name">
                {{ service.metadata.name }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Namespace">
                {{ service.metadata.namespace }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Selflink">
                {{ service.metadata.selfLink }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="UID">
                {{ service.metadata.uid }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Resource version">
                {{ service.metadata.resourceVersion }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Created">
                {{
                  service.metadata.creationTimestamp
                    | format('yyyy-MM-dd hh:mm:ss')
                }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Labels">
                <v-chip
                  small
                  class="mr-2 font-weight-black"
                  v-for="(item, i) in labelList"
                  :key="`label-${i}`"
                >
                  {{ item.text }} :
                  {{ item.value }}
                </v-chip>
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Annotations">
                <v-chip
                  small
                  class="mr-2 font-weight-black"
                  v-for="(item, i) in annotationList"
                  :key="`label-${i}`"
                >
                  {{ item.text }} :
                  {{ item.value }}
                </v-chip>
              </info-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            Spec
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <v-col cols="3">
              <info-card title="Cluster IP">
                {{ service.spec.clusterIP }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Type">
                {{ service.spec.type }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Session affinity">
                {{ service.spec.sessionAffinity }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="External traffic policy">
                {{ service.spec.externalTrafficPolicy }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Selector">
                <v-chip
                  small
                  class="mr-2 font-weight-black"
                  v-for="(item, i) in selectorList"
                  :key="`label-${i}`"
                >
                  {{ item.text }} :
                  {{ item.value }}
                </v-chip>
              </info-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-data-table
                class="transparent"
                disable-filtering
                disable-sort
                :headers="portHeaders"
                :items="service.spec.ports"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            Status
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          {{ service.status }}
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { mapToList } from '@/utils/convert';
import { Namespace, Service } from '@/types/backend';
import ServiceHandler from '@/handler/serviceHandler';

@Component
export default class ServiceInfoView extends Vue {
  service = new Service();

  async getCurrentService() {
    this.service = await ServiceHandler.getOneService(
      String(this.$route.query.namespace),
      this.$route.params.name
    );
    console.log(this.service);
  }

  get labelList() {
    return mapToList(this.service.metadata.labels);
  }

  get annotationList() {
    return mapToList(this.service.metadata.annotations);
  }

  get selectorList() {
    return mapToList(this.service.spec.selector);
  }

  get portHeaders() {
    return [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Protocol',
        value: 'protocol',
      },
      {
        text: 'Port',
        value: 'port',
      },
      {
        text: 'Target port',
        value: 'targetPort',
      },
      {
        text: 'Node port',
        value: 'nodePort',
      },
    ];
  }

  mounted() {
    console.log(this.service);
    this.getCurrentService();
  }
}
</script>

<style scoped></style>
