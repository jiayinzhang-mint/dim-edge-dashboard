import BasicHandler from './basicHandler';
import { ReplicaSet, Scale } from '@/types/backend';

export default class ReplicaSetHandler {
  static async getReplicaSetList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/replicaset/list', {
        namespace,
        serviceName
      });
      return Promise.resolve(rsp.items as ReplicaSet[]);
    } catch (err) {
      return Promise.reject([] as ReplicaSet[]);
    }
  }

  static async getOneReplicaSet(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/replicaset', {
        namespace,
        name
      });
      return Promise.resolve(rsp as ReplicaSet);
    } catch (err) {
      return Promise.reject(new ReplicaSet());
    }
  }
}
