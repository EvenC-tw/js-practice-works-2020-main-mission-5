import { service as request, uuid } from '../utils/request';

const apis = {
  // user
  login(data) {
    return request({
      url: 'auth/login',
      method: 'post',
      data,
    });
  },
  // products
  getProducts(data) {
    return request({
      url: `${uuid}/admin/ec/products`,
      method: 'get',
      params: data,
    });
  },
  createProduct(data) {
    return request({
      url: `${uuid}/admin/ec/product`,
      method: 'post',
      data,
    });
  },
  getProduct(data) {
    const { id } = data;
    return request({
      url: `${uuid}/admin/ec/product/${id}`,
      method: 'get',
    });
  },
  updateProduct(data) {
    const { id, tempProduct } = data;
    return request({
      url: `${uuid}/admin/ec/product/${id}`,
      method: 'patch',
      data: tempProduct,
    });
  },
  deleteProduct(data) {
    const { id } = data;
    return request({
      url: `${uuid}/admin/ec/product/${id}`,
      method: 'delete',
    });
  },
};
export default apis;
