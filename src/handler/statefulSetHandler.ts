import BasicHandler from './basicHandler';
import { StatefulSet, Scale } from '@/types/backend';

export default class StatefulSetHandler {
  static async getStatefulSetList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/statefulset/list', {
        namespace,
        serviceName,
      });
      return Promise.resolve(rsp.items as StatefulSet[]);
    } catch (err) {
      return Promise.reject([] as StatefulSet[]);
    }
  }

  static async getOneStatefulSet(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/statefulset', {
        namespace,
        name,
      });
      return Promise.resolve(rsp as StatefulSet);
    } catch (err) {
      return Promise.reject(new StatefulSet());
    }
  }

  static async updateStatefulSetScale(s: Scale) {
    try {
      const rsp = await BasicHandler.putRequest(
        '/api/k8s/statefulset/scale',
        s
      );
      return Promise.resolve(rsp as Scale);
    } catch (_) {
      return Promise.reject(new Scale());
    }
  }
}
