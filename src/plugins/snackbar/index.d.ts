import Vue, { PluginFunction } from 'vue';

export interface VuetifySnackbarUseOptions extends VuetifySnackbarObject {
  property?: string;
}

declare const VuetifySnackBarPlugin: VuetifySnackBarPlugin;
export default VuetifySnackBarPlugin;

export interface VuetifySnackBarPlugin {
  install: PluginFunction<VuetifySnackbarUseOptions>;
}

export interface VuetifySnackbarObject {
  color?: string;
}
declare module 'vue/types/vue' {
  interface Vue {
    $snack(
      message: string,
      options?: VuetifySnackbarObject
    ): Promise<boolean | undefined>;
  }
}
