import BasicHandler from './basicHandler';
import { Bucket } from '@/types/influxdb';

export default class InfluxDBHandler {
  static async checkSetup() {
    const rsp = await BasicHandler.getRequest(
      '/api/edgenode/influxdb/setup',
      {}
    );

    return rsp.setup as boolean;
  }

  static async setup(s: any) {
    const rsp = await BasicHandler.postRequest(
      '/api/edgenode/influxdb/setup',
      s
    );

    if (rsp.msg === 'success') return Promise.resolve();
    return Promise.reject();
  }

  static async signIn(p: { username: string; password: string }) {
    const rsp = await BasicHandler.postRequest(
      '/api/edgenode/influxdb/signin',
      p
    );

    if (rsp.msg === 'success') return Promise.resolve();
    return Promise.reject();
  }

  static async signOut() {
    const rsp = await BasicHandler.postRequest(
      '/api/edgenode/influxdb/signout',
      {}
    );

    if (rsp.msg === 'success') return Promise.resolve();
    return Promise.reject();
  }

  static async getAuthorization(p: {
    user?: string;
    userID?: string;
    org?: string;
    orgID?: string;
  }) {
    const rsp = await BasicHandler.getRequest(
      '/api/edgenode/influxdb/authorization',
      p
    );
    if (rsp.msg === 'success') return Promise.resolve(rsp);
    return Promise.reject();
  }

  static async getBucketList(p: {
    page: number;
    size: number;
    org?: string;
    orgID?: string;
    name?: string;
  }) {
    const rsp = await BasicHandler.getRequest(
      '/api/edgenode/influxdb/bucket/list',
      p
    );
    if (rsp.msg === 'success') return Promise.resolve(rsp.bucket as Bucket[]);
    return Promise.reject();
  }

  static async getBucket(bucketID: string) {
    const rsp = await BasicHandler.getRequest('/api/edgenode/influxdb/bucket', {
      bucketID,
    });
    if (rsp.msg === 'success') return Promise.resolve(rsp.bucket as Bucket);
    return Promise.reject();
  }
}
