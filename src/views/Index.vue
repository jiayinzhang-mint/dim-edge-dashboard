<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-toolbar dense flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">
          DIMedge
        </v-toolbar-title>
      </v-toolbar>
      <v-toolbar dense flat>
        <v-select
          class="body-2"
          :items="namespaceSelectList"
          outlined
          flat
          hide-details
          label="Namespace"
          dense
        ></v-select>
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
import { State, Mutation, Action } from 'vuex-class';

import { Namespace } from '@/types/backend';

import NamespaceHandler from '@/handler/namespaceHandler';

@Component
export default class IndexView extends Vue {
  @State('namespaceList') namespaceList!: Namespace[];
  @Action('getNamespaceList') getNamespaceList!: () => void;

  get navList() {
    return [
      {
        name: 'Dashboard',
        route: { path: '/index/dashboard', query: this.$route.query }
      },
      {
        name: 'Deployment',
        route: { path: '/index/deployment', query: this.$route.query }
      },
      {
        name: 'Service',
        route: { path: '/index/service', query: this.$route.query }
      }
    ];
  }

  get namespaceSelectList() {
    return this.namespaceList.map((e) => {
      return e.metadata.name;
    });
  }

  mounted() {
    if (!this.$route.query.namespace) {
      this.$router.push({
        query: { ...this.$route.query, ...{ namespace: 'defaults' } }
      });
    }
    this.getNamespaceList();
  }
}
</script>

<style scoped></style>
