<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-toolbar dense flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">
          DIM<span class="primary--text">edge</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-toolbar dense flat class="mt-3">
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
    <v-app-bar flat color="transparent" app dense>
      <v-btn icon small class="ml-0" @click="$router.go(-1)"
        ><v-icon size="20">mdi-arrow-left</v-icon></v-btn
      >
      <v-breadcrumbs :items="breadCrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            class="font-weight-black"
            :href="item.href"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
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
        route: { path: '/dashboard', query: this.$route.query }
      },
      {
        name: 'Deployment',
        route: { path: '/deployment', query: this.$route.query }
      },
      {
        name: 'Service',
        route: { path: '/service', query: this.$route.query }
      }
    ];
  }

  get breadCrumbs() {
    return this.$route.path
      .split('/')
      .slice(1)
      .map((e) => {
        return {
          text: e
        };
      });
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
