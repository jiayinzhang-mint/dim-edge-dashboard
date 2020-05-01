export class Query {
  metrics!: string;
  container?: string;
  pod?: string;
  id?: string;

  end!: string;
  duration!: string;
  step!: string;

  getQueryStr() {
    let condition = '';
    condition += `service = "dim-edge-mon-prometheus-op-kubelet",`;

    if (this.container) condition += `container = "${this.container}",`;
    if (this.pod) condition += `pod = "${this.pod}",`;
    if (this.id) condition += `id = "${this.id}"`;

    const query = `${this.metrics}{${condition}}`;
    return query;
  }
}

export class Metric {
  __name__!: string;
  container!: string;
  cpu!: string;
  endpoint!: string;
  id!: string;
  image!: string;
  instance!: string;
  job!: string;
  metrics_path!: string;
  name!: string;
  namespace!: string;
  node!: string;
  pod!: string;
  service!: string;
}

export class QueryMetricRes {
  metric!: Metric;
  values!: (string | number)[][];
}

export class Alert {
  constructor() {
    this.Annotations = {};
    this.Labels = {};
  }
  activeAt!: string;
  Annotations!: {
    message?: string;
  };
  Labels!: {
    alertnam?: string;
    job?: string;
    namespace?: string;
    service?: string;
    severity?: string;
  };
  State!: string;
  Value!: string;
}
