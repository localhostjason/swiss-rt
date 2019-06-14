import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

Object.assign(axios.defaults.headers.common, defaultHeaders);

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
);

// respone interceptor
service.interceptors.response.use(
  // todo mock js response
  // response => response.data,

  response => {
    const res = response.data;

    if (res.errcode) {
      Message({
        message: `错误：${res.errmsg}`,
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(res.errmsg)
    } else {
      return response.data
    }
  },
  error => {
    let resp;
    try {
      resp = error.response ? error.response.data._error.message : error;
    } catch (e) {
      console.log(error.response.data);
      resp = error.response ? JSON.stringify(error.response.data._issues) : error;
    }

    Message({
      message: `错误：${resp}`,
      type: 'error',
      duration: 3 * 1000
    });
    MessageBox.close();
    return Promise.reject(error)
  }
);

export default service
