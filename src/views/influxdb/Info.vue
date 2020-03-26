<template>
  <div>
    <v-toolbar
      class="acrylic"
      width="100%"
      style="position: fixed; z-index: 8;"
      dense
      flat
    >
      <v-tabs>
        <v-tab
          v-for="item in routeList"
          :key="item.name"
          :to="{
            path: `/influxdb/${$route.params.name}/${item.path}`,
            query: $route.query,
          }"
          >{{ item.name }}</v-tab
        >
      </v-tabs>
    </v-toolbar>
    <div style="padding-top: 48px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class InfluxDBInfo extends Vue {
  routeList = [
    {
      path: 'metrics',
      name: 'Metrics',
    },
    {
      path: 'query',
      name: 'Query',
    },
  ];
}
</script>

<style scoped></style>
