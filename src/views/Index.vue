<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-toolbar dense flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">
          DIMedge
        </v-toolbar-title>
      </v-toolbar>
      <v-list dense>
        <v-list-item
          v-for="(item, i) in navList"
          :key="`nav-${i}`"
          :to="item.route"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content> <router-view></router-view> </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class IndexView extends Vue {
  get navList() {
    return [
      {
        name: 'Dashboard',
        route: '/index'
      },
      {
        name: 'Deployment',
        route: '/index'
      },
      {
        name: 'Service',
        route: '/service'
      }
    ];
  }
}
</script>

<style scoped></style>
