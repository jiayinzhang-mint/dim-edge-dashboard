<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Metadata
            </v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-row dense>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Name</v-card-title
                  >
                  <v-card-text>{{ service.metadata.name }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Namespace</v-card-title
                  >
                  <v-card-text>{{ service.metadata.namespace }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Selflink</v-card-title
                  >
                  <v-card-text>{{ service.metadata.selfLink }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >UID</v-card-title
                  >
                  <v-card-text>{{ service.metadata.uid }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Resource version</v-card-title
                  >
                  <v-card-text>{{
                    service.metadata.resourceVersion
                  }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Created</v-card-title
                  >
                  <v-card-text>{{
                    service.metadata.creationTimestamp
                      | format('yyyy-MM-dd hh:mm:ss')
                  }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Labels</v-card-title
                  >
                  <v-list dense>
                    <v-list-item
                      v-for="(item, i) in labelList"
                      :key="`label-${i}`"
                    >
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.value
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Labels</v-card-title
                  >
                  <v-list dense>
                    <v-list-item
                      v-for="(item, i) in annotationList"
                      :key="`label-${i}`"
                    >
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.value
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Spec
            </v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-row dense>
              <v-col cols="3">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Cluster IP</v-card-title
                  >
                  <v-card-text>{{ service.spec.clusterIP }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Type</v-card-title
                  >
                  <v-card-text>{{ service.spec.type }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >Session affinity</v-card-title
                  >
                  <v-card-text>{{ service.spec.sessionAffinity }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card outlined height="100%">
                  <v-card-title class="body-2 font-weight-black"
                    >External traffic policy</v-card-title
                  >
                  <v-card-text>{{
                    service.spec.externalTrafficPolicy
                  }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            {{ service.spec }}
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Status
            </v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            {{ service.status }}
          </v-container>
        </v-card>
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

  mounted() {
    console.log(this.service);
    this.getCurrentService();
  }
}
</script>

<style scoped></style>
