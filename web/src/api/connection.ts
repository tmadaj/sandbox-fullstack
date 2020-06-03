import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken } from 'src/redux/selectors';

const baseConfig = (): AxiosRequestConfig => ({
  baseURL: `${process.env.API_HOST}${process.env.API_PATH}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getAccessToken(),
  },
});

const connection = (): AxiosInstance => axios.create(baseConfig());
const authConnection = (): AxiosInstance => axios.create(baseConfig());

export { connection, authConnection };
