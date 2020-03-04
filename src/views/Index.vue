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
          :items="namespaceNameList"
          v-model="currentNamespace"
          @change="updateCurrentNamespace"
          outlined
          flat
          hide-details
          label="Namespace"
          dense
        ></v-select>
      </v-toolbar>
      <v-list dense nav class="px-4">
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
import { State, Mutation, Action, Getter } from 'vuex-class';

import { Namespace } from '@/types/backend';

import NamespaceHandler from '@/handler/namespaceHandler';

@Component
export default class IndexView extends Vue {
  @State('namespaceList') namespaceList!: Namespace[];
  @Getter('namespaceNameList') namespaceNameList!: () => string[];
  @Action('getNamespaceList') getNamespaceList!: () => void;

  currentNamespace = '';

  updateCurrentNamespace(v: string) {
    this.$router.push({
      path: this.$route.path,
      query: { ...this.$route.query, ...{ namespace: v } }
    });
  }

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

  mounted() {
    if (!this.$route.query.namespace) {
      this.$router.push({
        query: { ...this.$route.query, ...{ namespace: 'default' } }
      });
    }
    this.currentNamespace = String(this.$route.query.namespace);
    this.getNamespaceList();
  }
}
</script>

<style scoped></style>
