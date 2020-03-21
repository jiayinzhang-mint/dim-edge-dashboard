import BasicHandler from './basicHandler';
import { Scale } from '@/types/backend';

export default class DeploymentHandler {
  static async getDeploymentList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/deployment/list', {
        namespace,
        serviceName
      });
      return Promise.resolve(rsp.items as any[]);
    } catch (err) {
      return Promise.reject([]);
    }
  }

  static async getOneDeployment(namespace: string, name: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/deployment', {
        namespace,
        name
      });
      return Promise.resolve(rsp as any);
    } catch (err) {
      return Promise.reject(null);
    }
  }

  static async updateDeploymentScale(s: Scale) {
    try {
      const rsp = await BasicHandler.putRequest('/api/k8s/deployment/scale', s);
      return Promise.resolve(rsp as Scale);
    } catch (_) {
      return Promise.reject(new Scale());
    }
  }
}
