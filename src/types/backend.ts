export interface StringMap {
  [key: string]: string;
}

export class ConfigMapKeyRef {
  name!: string;
  key!: string;
}

export class SecretKeyRef {
  name!: string;
  key!: string;
}

export interface ErrStatus {
  message: string;
  code: number;
  status: string;
  reason: string;
}

/* tslint:disable */
export interface K8sError {
  ErrStatus: ErrStatus;
}

export class EnvVar {
  name!: string;
  value!: string;
  valueFrom!: EnvVarSource;
}

export class EnvVarSource {
  configMapKeyRef!: ConfigMapKeyRef;
  secretKeyRef!: SecretKeyRef;
}

export interface TypeMeta {
  kind: string;
  scalable?: boolean;
}

export interface ListMeta {
  totalItems: number;
}

export interface ObjectMeta {
  name?: string;
  namespace?: string;
  labels?: StringMap;
  annotations?: StringMap;
  creationTimestamp?: string;
  uid?: string;
}

export interface ResourceDetail {
  objectMeta: ObjectMeta;
  typeMeta: TypeMeta;
  errors: K8sError[];
}

export interface ResourceList {
  listMeta: ListMeta;
  items?: Resource[];
  errors?: K8sError[];
}

export interface Resource {
  objectMeta: ObjectMeta;
  typeMeta: TypeMeta;
}

export class Toleration {
  key!: string;
  operator!: string;
  effect!: string;
  tolerationSeconds!: number;
}

export class Metadata {
  constructor() {
    this.name = '';
  }
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

export class IP {
  ip!: string;
}

export class Port {
  name!: string;
  protocol!: string;
  port!: number;
  targetPort!: number;
  nodePort!: number;
}

export class Volume {
  name!: string;
  mountPath!: string;
  persistentVolumeClaim!: {
    claimName: string;
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

export class NodeBalancerIngress {
  ip!: string;
  hostname!: string;
}

export class DataPoint {
  x!: number;
  y!: number;
}

export class Metric {
  dataPoints!: DataPoint[];
  metricName!: string;
  aggregation!: string;
}

export class Container {
  name!: string;
  image!: string;
  terminationMessagePath!: string;
  terminationMessagePolicy!: string;
  imagePullPolicy!: string;
  ports!: Port[];
  volumeMounts!: Volume[];
  resources!: any;
}

export interface ContainerStateWaiting {
  reason: string;
}

export interface ContainerStateRunning {
  startedAt: string;
}

export interface ContainerStateTerminated {
  reason: string;
  signal: number;
  exitCode: number;
}

export interface ContainerState {
  waiting?: ContainerStateWaiting;
  terminated?: ContainerStateTerminated;
  running?: ContainerStateRunning;
}

export class ContainerStatus {
  name!: string;
  state!: ContainerState;
  lastState!: ContainerState;
  ready!: boolean;
  restartCount!: number;
  image!: string;
  imageID!: string;
  containerID!: string;
  started!: boolean;
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
  constructor() {
    this.metadata = new Metadata();
    this.spec = {
      ports: [],
      selector: {},
      clusterIP: '',
      type: '',
      sessionAffinity: '',
      externalTrafficPolicy: ''
    };
    this.status = {
      loadBalancer: []
    };
  }
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

export class Pod {
  constructor() {
    this.metadata = new Metadata();
    this.spec;
  }
  metadata!: Metadata;
  spec!: {
    volumes: Volume[];
    containers: Container[];
    restartPolicy: string;
    terminationGracePeriodSeconds: number;
    dnsPolicy: string;
    serviceAccountName: string;
    serviceAccount: string;
    nodeName: string;
    hostname: string;
    subdomain: string;
    schedulerName: string;
    priority: number;
    enableServiceLinks: boolean;
    securityContext: any;
    tolerations: Toleration[];
  };
  status!: {
    phase: string;
    conditions: Condition[];
    hostIP: string;
    podIP: string;
    podIPs: IP[];
    startTime: string;
    containerStatuses: ContainerStatus[];
    qosClass: string;
  };
}
