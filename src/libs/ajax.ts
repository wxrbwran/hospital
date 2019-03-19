import axios, { AxiosInstance } from 'axios';
import { Toast } from 'vant';
import config from '../config';

const { API_URL, API_NAMESPACE } = config;

const api:AxiosInstance = axios.create({
  baseURL: API_URL + API_NAMESPACE,
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return Promise.reject(new Error('请求失败'));
    }
    const { status } = response.data;
    if (status === 'fail') {
      const { data } = response.data;
      const msg = data.result || data.message || '请求失败';
      return Promise.reject(new Error(msg));
    }
    return response.data.data;
  }, (error) => {
    if (error.message && error.message.indexOf('timeout') !== -1) {
      Toast.fail('请求超时');
      return false;
    }
    if (error.message && error.message.indexOf('Network Error') !== -1) {
      Toast.fail('网络异常');
      return false;
    }
    if (error.response && error.response.status === 401) {
      Toast.fail('登录超时');
      // router.push({ path: 'login' });
      window.location.hash = '#/login';
      return false;
    }
    Toast.fail('服务异常');
    return false;
  },
);

interface iOption {
  url:string;
  method?:string;
  params?:any;
  data?: any;
  success:any;
  fail?:any;
  finally?:any;
}

const req = async (option:iOption, vm:any) => {
  try {
    let res = null;
    switch (option.method) {
      case 'delete':
        res = await api.delete(option.url, { data: option.data }); break;
      case 'post':
        res = await api.post(option.url, option.params); break;
      case 'patch':
        res = await api.patch(option.url, option.params); break;
      case 'get':
      default:
        res = await api.get(option.url, { params: option.params });
    }
    option.success.call(vm, res);
  } catch (e) {
    if (option.fail) {
      option.fail.call(vm, e);
    } else {
      Toast.fail(e);
    }
  } finally {
    if (option.finally) {
      option.finally.call(vm);
    }
  }
};

const methods = ['Get', 'Delete', 'Post', 'Patch'];

interface iMethods{
  [index:string]: any;
}

const apiMethods:iMethods = {};

methods.forEach((method) => {
  apiMethods[`api${method}`] = (option:iOption, vm:any) => {
    const op = Object.assign(option, { method: method.toLowerCase() });
    req(op, vm);
  };
});

const {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} = apiMethods;

export {
  api,
  req,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
};
