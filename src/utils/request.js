import axios from 'axios';

const uuid = process.env.VUE_APP_UUID;
const baseURL = process.env.VUE_APP_BASE_API;
const service = axios.create({
  baseURL,
});

service.interceptors.request.use(
  (config) => {
    const configWrapper = { ...config };
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hex-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      configWrapper.headers['hex-token'] = token;
    }
    return configWrapper;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const {
      config: { url },
      data,
      status,
    } = response;
    if (url === 'auth/login' && status === 200 && data.success) {
      const { token, expired } = data;
      service.interceptors.request.use((config) => ({
        ...config,
        headers: { ...config.headers, 'hex-token': data.token },
        common: { ...config.common, Authorization: `Bearer ${token}` },
      }));
      document.cookie = `hex-token=${token};expires=${new Date(expired * 1000)}; path=/`;
    }
    return data;
  },
  (error) => {
    console.log(`err${error}`);
    return Promise.reject(error);
  },
);

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
//           service.config.headers.add('Authorization', '');
//           location.reload();
//           break;
//         default:
//           break;
//       }
//     }
//   },
// };
export { service, uuid };
