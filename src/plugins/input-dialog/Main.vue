<template>
  <div>
    <v-dialog :persistent="persistant" :width="width" v-model="openShow">
      <v-card :color="color">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
        <slot></slot>
        <v-container class="pt-0" fluid>
          <v-row justify="center">
            <v-btn rounded outlined @click="confirmFunc()">Ok</v-btn>
            <v-btn rounded class="ml-3" text @click="openShow = false"
              >Cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InputDialog extends Vue {
  @Prop() open!: boolean;
  @Prop() persistant!: boolean;
  @Prop() color!: string;
  @Prop() width!: number;
  @Prop() title!: string;
  @Prop() confirmFunc!: () => {};

  get openShow() {
    return this.open;
  }

  set openShow(v: boolean) {
    this.$emit('update:open', v);
  }
}
</script>

<style scoped></style>
