import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { handleApiError } from '../errorHander';

export class ApiService {

  async request<T>(
    accessToken: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url: `http://spring-inventomate:8080`,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      const apiError = handleApiError(error as AxiosError);
      throw apiError;
    }
  }
}
