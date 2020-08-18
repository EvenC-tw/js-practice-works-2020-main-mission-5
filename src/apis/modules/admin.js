import { service as request, uuid } from '@/utils/request';

const apiBase = `${uuid}/admin/ec/`;
const apis = {
  // user
  login(data) {
    return request({
      url: 'auth/login',
      method: 'post',
      data,
    });
  },
  checkLogin() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hex-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return request({
      url: 'auth/check',
      method: 'post',
      data: { api_token: token },
    });
  },
  logout() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hex-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return request({
      url: 'auth/logout',
      method: 'post',
      data: { api_token: token },
    });
  },
  // products
  getProducts(data) {
    return request({
      url: `${apiBase}products`,
      method: 'get',
      params: data,
    });
  },
  createProduct(data) {
    return request({
      url: `${apiBase}product`,
      method: 'post',
      data,
    });
  },
  getProduct(data) {
    const { id } = data;
    return request({
      url: `${apiBase}product/${id}`,
      method: 'get',
    });
  },
  updateProduct(data) {
    const { id } = data;
    return request({
      url: `${apiBase}product/${id}`,
      method: 'patch',
      data,
    });
  },
  deleteProduct(data) {
    const { id } = data;
    return request({
      url: `${apiBase}product/${id}`,
      method: 'delete',
    });
  },
};
export default apis;
