import BasicHandler from './basicHandler';
import { Pod, Container, Metrics } from '@/types/backend';

export default class PodHandler {
  static async getPodList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/pod/list', {
        namespace,
        serviceName
      });
      return Promise.resolve(rsp.items as Pod[]);
    } catch (err) {
      return Promise.reject([] as Pod[]);
    }
  }

  static async getOnePod(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/pod', {
        namespace,
        name
      });
      return Promise.resolve(rsp as Pod);
    } catch (err) {
      return Promise.reject(new Pod());
    }
  }

  static async getPodMetricsList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/pod/metrics/list', {
        namespace,
        serviceName
      });
      return Promise.resolve(rsp.items as Metrics[]);
    } catch (err) {
      return Promise.reject([] as Metrics[]);
    }
  }

  static async getOnePodMetrics(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/pod/metrics', {
        namespace,
        name
      });
      return Promise.resolve(rsp.containers as Metrics[]);
    } catch (err) {
      return Promise.reject([] as Metrics[]);
    }
  }
}
