export interface StringMap {
  [key: string]: string;
}

export class Namespace {
  metadata!: Metadata;
  spec!: {
    finalizers: string[];
  };
  status!: {
    phase: string[];
    conditions: Condition[];
  };
}

export class Service {
  metadata!: Metadata;
  spec!: {
    ports: Port[];
    selector: StringMap;
    clusterIP: string;
    type: string;
    sessionAffinity: string;
    externalTrafficPolicy: string;
  };
  status!: {
    loadBalancer: NodeBalancerIngress[];
  };
}

export class Metadata {
  name!: string;
  generateName!: string;
  namespace!: string;
  selfLink!: string;
  uid!: string;
  resourceVersion!: string;
  generation!: number;
  creationTimestamp!: string;
  deletionTimestamp!: string;
  deletionGracePeriodSeconds!: number;
  labels!: StringMap;
  annotations!: StringMap;
  finalizers!: string[];
  clusterName!: string;
}

export class Port {
  name!: string;
  protocol!: string;
  port!: number;
  targetPort!: number;
  nodePort!: number;
}

export class Condition {
  type!: string;
  status!: string;
  lastProbeTime!: string;
  lastTransitionTime!: string;
  reason!: string;
  message!: string;
}

export class NodeBalancerIngress {
  ip!: string;
  hostname!: string;
}
