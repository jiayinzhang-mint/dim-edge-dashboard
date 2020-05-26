<template>
  <div>
    <v-toolbar
      class="acrylic"
      width="100%"
      style="position: fixed; z-index: 8;"
      dense
      :color="
        $vuetify.theme.dark ? `rgba(37,37,37,0.3)` : `rgba(235,235,235,0.3)`
      "
      flat
    >
      <v-toolbar-title class="subtitle-1 font-weight-black">
        dim-edge-core: /Store/CheckSetup
      </v-toolbar-title>
    </v-toolbar>
    <v-container fluid style="padding-top: 48px;">
      <v-row>
        <v-col cols="12">
          <v-slide-group>
            <v-slide-item class="mx-1">
              <v-card flat color="yellow" height="80" width="230"> </v-card>
            </v-slide-item>
            <v-slide-item class="mx-1">
              <v-card flat color="orange" height="80" width="1"> </v-card>
            </v-slide-item>
            <v-slide-item class="mx-1">
              <v-card flat color="red lighten-2" height="80" width="1">
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col cols="12">
          <info-card flat>
            <v-toolbar flat color="transparent">
              <v-toolbar-title class="body-2 font-weight-black">
                <v-icon size="18" color="yellow darken-2" class="mb-1 mr-2"
                  >mdi-moon-full</v-icon
                >
                /Store/CheckSetup</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <div class="caption font-weight-black">
                <span class="grey--text"> Service: </span>
                dim-edge-core

                <span class="grey--text ml-3"> Duration: </span>
                231.42ms

                <span class="grey--text ml-3"> Start Time: </span>
                0s

                <span class="grey--text ml-3"> Span ID: </span>
                21a86294542465b1
              </div>
            </v-toolbar>

            <v-card-text class="caption pb-0">
              <span class="font-weight-black">Tags:</span>
              <span class="ml-2">internal.span.format = proto </span>
              <span class="ml-2">sampler.param = true</span>
              <span class="ml-2">sampler.type = const</span>
            </v-card-text>
            <v-card-text class="caption">
              <span class="font-weight-black">Process:</span>
              <span class="ml-2">client.uuid = 6e0967ecf82ba5a5 </span>
              <span class="ml-2">hostname = MINT-MBP</span>
              <span class="ml-2">ip = 192.168.50.232</span>
            </v-card-text>
          </info-card>
        </v-col>

        <v-col cols="12">
          <info-card flat>
            <v-toolbar flat color="transparent">
              <v-toolbar-title class="body-2 font-weight-black">
                <v-icon size="18" color="orange darken-2" class="mb-1 mr-2"
                  >mdi-moon-full</v-icon
                >
                /protocol.StoreService/CheckSetup</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <div class="caption font-weight-black">
                <span class="grey--text"> Service: </span>
                dim-edge-node

                <span class="grey--text ml-3"> Duration: </span>
                1.02ms

                <span class="grey--text ml-3"> Start Time: </span>
                0.59ms

                <span class="grey--text ml-3"> Span ID: </span>
                3b167ca74410757e
              </div>
            </v-toolbar>

            <v-card-text class="caption pb-0">
              <span class="font-weight-black">Tags:</span>
              <span class="ml-2">component = GRPC </span>
              <span class="ml-2">internal.span.format = proto </span>
              <span class="ml-2">span.kind = server</span>
            </v-card-text>
            <v-card-text class="caption">
              <span class="font-weight-black">Process:</span>
              <span class="ml-2">client.uuid = 2a558634b118d07f </span>
              <span class="ml-2">hostname = MINT-MBP</span>
              <span class="ml-2">ip = 192.168.50.232</span>
            </v-card-text>
          </info-card>
        </v-col>

        <v-col cols="12">
          <info-card flat>
            <v-toolbar flat color="transparent">
              <v-toolbar-title class="body-2 font-weight-black">
                <v-icon size="18" color="red lighten-2" class="mb-1 mr-2"
                  >mdi-moon-full</v-icon
                >/dim-edge-influxdb/api/v2/setup</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <div class="caption font-weight-black">
                <span class="grey--text"> Service: </span>
                dim-edge-influxdb

                <span class="grey--text ml-3"> Duration: </span>
                0.94ms

                <span class="grey--text ml-3"> Start Time: </span>
                0.62ms

                <span class="grey--text ml-3"> Span ID: </span>
                2ba2cc23e80ba34b
              </div>
            </v-toolbar>

            <v-card-text class="caption pb-0">
              <span class="font-weight-black">Tags:</span>
              <span class="ml-2">internal.span.format = proto </span>
            </v-card-text>
            <v-card-text class="caption">
              <span class="font-weight-black">Process:</span>
              <span class="ml-2">client.uuid = 3bd2485fc271175 </span>
              <span class="ml-2">hostname = MINT-MBP</span>
              <span class="ml-2">ip = 192.168.50.232</span>
            </v-card-text>
          </info-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Tracing extends Vue {}
</script>

<style scoped></style>
