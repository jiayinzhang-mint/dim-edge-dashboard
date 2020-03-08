import BasicHandler from './basicHandler';
import { VolumeClaim } from '@/types/backend';

export default class VolumeHandler {
  static async getVolumeClaimList(namespace: string, serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/volume/claim/list', {
        namespace,
        serviceName
      });
      return Promise.resolve(rsp.items as VolumeClaim[]);
    } catch (err) {
      return Promise.reject([] as VolumeClaim[]);
    }
  }

  static async getVolumeList(serviceName?: string) {
    try {
      const rsp = await BasicHandler.getRequest('/api/k8s/volume/list', {
        serviceName
      });
      return Promise.resolve(rsp.items);
    } catch (err) {
      return Promise.reject([]);
    }
  }
}
