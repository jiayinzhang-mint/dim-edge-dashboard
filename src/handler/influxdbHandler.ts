import BasicHandler from './basicHandler';

export default class InfluxDBHandler {
  static async checkSetup() {
    const rsp = await BasicHandler.getRequest(
      '/api/edgenode/influxdb/setup',
      {}
    );

    return rsp.setup as boolean;
  }
}
