import BasicHandler from './basicHandler';

import { Namespace } from '@/types/backend';

export default class NamespaceHandler {
  static async getNamespaceList() {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/namespace/list', {});
      return Promise.resolve(rsp.items as Namespace[]);
    } catch (err) {
      return Promise.reject([] as Namespace[]);
    }
  }
}
