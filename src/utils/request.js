import axios from 'axios';
// import { getToken, } from '@/utils/auth'
const uuid = process.env.VUE_APP_UUID;
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const configWrapper = { ...config };
    // do something before request is sent
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)Hex-Token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      configWrapper.headers['Hex-Token'] = token;
    }
    return configWrapper;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

service.interceptors.response.use((response) => {
  // eslint-disable-next-line
  response;
});

// const uuid = process.env.VUE_APP_UUID;
// const proxies = {
//   callbackPX(res, callback) {
//     return (() => {
//       if (callback && typeof callback === 'function') {
//         const { data } = res;
//         callback(data);
//       }
//     })();
//   },
//   errorPX(err) {
//     // TODO some error handle
//     if (err && err.response && err.response.status) {
//       switch (err.response.status) {
//         case 401:
//           document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
//           service.config.headers.add Authorization', `Bearer ${token}`);
//           location.reload();
//           break;
//         default:
//           break;
//       }
//     }
//   },
// };
export { service, uuid };
