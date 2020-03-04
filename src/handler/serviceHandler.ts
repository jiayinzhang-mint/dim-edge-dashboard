import BasicHandler from './basicHandler';
import { Service } from '@/types/backend';

export default class ServiceHandler {
  static async getServiceList(namespace: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/service/list', {
        namespace
      });
      return Promise.resolve(rsp.items as Service[]);
    } catch (err) {
      return Promise.reject([] as Service[]);
    }
  }

  static async getOneService(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/service', {
        namespace,
        name
      });
      return Promise.resolve(rsp as Service);
    } catch (err) {
      return Promise.reject(new Service());
    }
  }
}
