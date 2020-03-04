<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              Metadata
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Namespace, Service } from '@/types/backend';
import ServiceHandler from '@/handler/serviceHandler';

@Component
export default class ServiceInfoView extends Vue {
  service: Service = new Service();

  async getCurrentService() {
    this.service = await ServiceHandler.getOneService(
      String(this.$route.query.namespace),
      this.$route.params.name
    );
  }

  mounted() {
    this.getCurrentService();
  }
}
</script>

<style scoped></style>
