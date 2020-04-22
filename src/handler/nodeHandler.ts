import BasicHandler from './basicHandler';
import { Metrics, K8SNode } from '@/types/backend';

export default class NodeHandler {
  static async getNodeMetricsList() {
    try {
      const rsp = await BasicHandler.getRequest(
        '/api/k8s/node/metrics/list',
        {}
      );
      return Promise.resolve(rsp.items as Metrics[]);
    } catch (_) {
      return Promise.reject([] as Metrics[]);
    }
  }

  static async getOneNodeMetrics(name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/node/metrics', {
        name,
      });
      return Promise.resolve(rsp as Metrics);
    } catch (err) {
      return Promise.reject(new Metrics());
    }
  }

  static async getNodeList() {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/node/list', {});
      return Promise.resolve(rsp.items as K8SNode[]);
    } catch (_) {
      return Promise.reject([] as K8SNode[]);
    }
  }

  static async getOneNode(name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/node', { name });
      return Promise.resolve(rsp as K8SNode);
    } catch (_) {
      return Promise.reject(new K8SNode());
    }
  }
}
