<template>
  <div>
    <v-dialog :width="width" v-model="openShow">
      <v-card>
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="body-2 font-weight-black">
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InputDialog extends Vue {
  @Prop() open!: boolean;
  @Prop() width!: number;
  @Prop() title!: string;

  get openShow() {
    return this.open;
  }

  set openShow(v: boolean) {
    this.$emit('update:open', v);
  }
}
</script>

<style scoped></style>
