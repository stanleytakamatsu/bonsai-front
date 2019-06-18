interface IHttpDriver {
  get<T>(url: string, params?: any): Promise<T>;

  put<T>(url: string, data?: any, headers?: any): Promise<T>;

  post<T>(url: string, data?: any, headers?: any): Promise<T>;

  delete<T>(url: string, headers?: any): Promise<T>;
}

export default IHttpDriver;
