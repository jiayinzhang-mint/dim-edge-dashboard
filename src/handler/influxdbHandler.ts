import BasicHandler from './basicHandler';

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
}
