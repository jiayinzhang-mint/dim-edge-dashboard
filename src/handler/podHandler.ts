import BasicHandler from './basicHandler';
import { Pod } from '@/types/backend';

export default class PodHandler {
  static async getPodList(namespace: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/pod/list', {
        namespace
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
}
