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
                {{ pod.metadata.name }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Namespace">
                {{ pod.metadata.namespace }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Selflink">
                {{ pod.metadata.selfLink }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="UID">
                {{ pod.metadata.uid }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Resource version">
                {{ pod.metadata.resourceVersion }}
              </info-card>
            </v-col>
            <v-col cols="3">
              <info-card title="Created">
                {{
                  pod.metadata.creationTimestamp | format('yyyy-MM-dd hh:mm:ss')
                }}
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
            {{ pod.spec }}
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
          {{ pod.status }}
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PodHandler from '@/handler/podHandler';
import { Pod } from '@/types/backend';

@Component
export default class PodInfoView extends Vue {
  pod = new Pod();

  async getCurrentPod() {
    this.pod = await PodHandler.getOnePod(
      String(this.$route.query.namespace),
      this.$route.params.name
    );
  }

  mounted() {
    this.getCurrentPod();
  }
}
</script>

<style scoped></style>
