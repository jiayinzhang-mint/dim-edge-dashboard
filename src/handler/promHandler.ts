import basicHandler from './basicHandler';
import { Query, QueryMetricRes, Alert } from '@/types/prom';

export default class PromHandler {
  static async getCPUPercentageRange(q: Query) {
    const queryStr = `sum(delta(container_cpu_usage_seconds_total{container="${q.container}",pod="${q.pod}",service = "dim-edge-mon-prometheus-op-kubelet"}[1m])) / (sum(container_spec_cpu_quota{container="${q.container}",pod="${q.pod}",service = "dim-edge-mon-prometheus-op-kubelet"}) /100000*60 )`;

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: queryStr.replace(/\u21b5/g, ''),
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getSystemCPUPercentageRange(q: Query) {
    const queryStr = `sum (rate (container_cpu_usage_seconds_total{id="/"}[1m])) / sum (machine_cpu_cores) * 100`
    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: queryStr.replace(/\u21b5/g, ''),
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getMemUsageRange(q: Query) {
    q.metrics = 'container_memory_usage_bytes';

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: q.getQueryStr(),
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getFsUsageRange(q: Query) {
    q.metrics = 'container_fs_usage_bytes';

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: q.getQueryStr(),
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getThreadUsageRange(q: Query) {
    q.metrics = 'container_threads';

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: q.getQueryStr(),
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getNetworkTransmitRange(q: Query) {
    const queryStr = `sum(delta(container_network_transmit_bytes_total{pod="${q.pod}",service = "dim-edge-mon-prometheus-op-kubelet"}[1m]))/60`;

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: queryStr,
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getNetworkReceiveRange(q: Query) {
    const queryStr = `sum(delta(container_network_receive_bytes_total{pod="${q.pod}",service = "dim-edge-mon-prometheus-op-kubelet"}[1m]))/60`;

    const rsp = await basicHandler.getRequest('/api/prometheus/query/range', {
      query: queryStr,
      duration: q.duration,
      step: q.step,
    });

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.result as QueryMetricRes[]);
    }
    return Promise.reject([]);
  }

  static async getAlert() {
    const rsp = await basicHandler.getRequest('/api/prometheus/alert', {});
    return rsp.alert as Alert[];
  }
}
