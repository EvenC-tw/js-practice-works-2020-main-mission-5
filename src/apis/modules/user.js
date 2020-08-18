import { service as request, uuid } from '@/utils/request';

const apiBase = `${uuid}/ec/`;
const apis = {
  // products
  getProducts() {
    return request({
      url: `${apiBase}products`,
      method: 'get',
    });
  },
  //   createProduct(data) {
  //     return request({
  //       url: `${uuid}/admin/ec/product`,
  //       method: 'post',
  //       data,
  //     });
  //   },
  getShopping() {
    return request({
      url: `${apiBase}shopping`,
      method: 'get',
    });
  },
  insertShopping(data) {
    return request({
      url: `${apiBase}shopping`,
      method: 'post',
      data,
    });
  },
};
export default apis;
