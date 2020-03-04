import { Dictionary } from 'vue-router/types/router';

export interface StringMap {
  [key: string]: string;
}

export class Namespace {
  metadata!: {
    name: string;
    generateName: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    deletionTimestamp: string;
    deletionGracePeriodSeconds: number;
    labels: StringMap;
    annotations: StringMap;
    finalizers: string[];
    clusterName: string;
  };
  spec!: {
    finalizers: string[];
  };
  status!: {
    phase: string[];
    conditions: Condition[];
  };
}

export class Condition {
  type!: string;
  status!: string;
  lastProbeTime!: string;
  lastTransitionTime!: string;
  reason!: string;
  message!: string;
}
