import axios, { AxiosError } from 'axios';

class BasicHandler {
  static async getData(rsp: any) {
    let rspData = rsp;
    if (rsp.data) {
      rspData = rsp.data;
    }
    return rspData;
  }

  static getError(rsp: AxiosError) {
    return rsp.response?.status;
  }

  static async getRequest(url: string, params: any) {
    try {
      const rsp = await axios.get(`${url}`, { params });
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);

      return this.getData(rsp);
    } catch (err) {
      return this.getError(err);
    }
  }

  static async postRequest(url: string, params: any) {
    try {
      const rsp = await axios.post(`${url}`, params);
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);

      return this.getData(rsp);
    } catch (err) {
      return this.getError(err);
    }
  }

  static async putRequest(url: string, params: any) {
    try {
      const rsp = await axios.put(`${url}`, params);
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);

      return this.getData(rsp);
    } catch (err) {
      return this.getError(err);
    }
  }

  static async deleteRequest(url: string, params: any) {
    try {
      const rsp = await axios.delete(`${url}`, { params });
      const json = rsp.data;
      const msg = { url, params, rsp: json };

      console.log(msg);

      return this.getData(rsp);
    } catch (err) {
      return this.getError(err);
    }
  }
}

export default BasicHandler;
