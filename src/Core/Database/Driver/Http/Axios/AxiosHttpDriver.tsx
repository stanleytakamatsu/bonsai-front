import Axios from "axios";

import IHttpDriver from "../IHttpDriver";
import { HttpErrorFactory } from "./Factory/HttpErrorFactory";
import IAxiosHttpConfig from "./IAxiosHttpConfig";

class AxiosHttp implements IHttpDriver {
  private readonly baseUrl: string;
  private readonly connectionTimeout: number;

  public constructor(config: IAxiosHttpConfig) {
    this.baseUrl = config.baseUrl;
    this.connectionTimeout = config.connectionTimeout;

    Axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const config: any = {
      timeout: this.connectionTimeout
    };

    if (params) {
      config.params = params;
    }

    try {
      const response = await Axios.get<T>(this.baseUrl + url, config);

      return response.data;
    } catch (error) {
      throw HttpErrorFactory.createHttpError(error);
    }
  }

  public async put<T>(url: string, data?: any, headers?: any): Promise<T> {
    const config: any = {
      timeout: this.connectionTimeout
    };

    if (headers) {
      config.headers = headers;
    }

    try {
      const response = await Axios.put<T>(this.baseUrl + url, data, config);

      return response.data;
    } catch (error) {
      throw HttpErrorFactory.createHttpError(error);
    }
  }

  public async post<T>(url: string, data?: any, headers?: any): Promise<T> {
    const config: any = {
      timeout: this.connectionTimeout
    };

    if (headers) {
      config.headers = headers;
    }

    try {
      const response = await Axios.post<T>(this.baseUrl + url, data, config);

      return response.data;
    } catch (error) {
      throw HttpErrorFactory.createHttpError(error);
    }
  }

  public async delete<T>(url: string, headers?: any): Promise<T> {
    const config: any = {
      timeout: this.connectionTimeout
    };

    if (headers) {
      config.headers = headers;
    }

    try {
      const response = await Axios.delete<T>(this.baseUrl + url, config);

      return response.data;
    } catch (error) {
      throw HttpErrorFactory.createHttpError(error);
    }
  }
}

export { AxiosHttp };
