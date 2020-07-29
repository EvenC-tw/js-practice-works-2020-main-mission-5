<template>
  <div :class="[isModalShow ? 'opa-50' : '', 'container-fluid py-5']">
    <button type="button" class="btn btn-primary float-right" @click="editProduct('create')">
      Create
    </button>
    <table class="table">
      <h1>List of Products</h1>
      <thead class="thead-dark">
        <tr>
          <th>Category</th>
          <th>Product Title</th>
          <th>List Price</th>
          <th>Retail Price</th>
          <th>Enabled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="products.length > 0">
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.origin_price && product.origin_price.toLocaleString() }}</td>
            <td>{{ product.price && product.price.toLocaleString() }}</td>
            <td :class="[product.enabled ? 'enabled' : 'disabled']">
              {{ product.enabled ? "enabled" : "disabled" }}
            </td>
            <td>
              <div class="btn-group" role="group" aria-label="Button group">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="editProduct('edit', product.id)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteProduct(product.id)"
                >
                  delete
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6" class="text-center">
              N/A
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li :class="[pagination.current_page === 1 ? 'disabled' : '', 'page-item']">
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page - 1)"
            >Previous</a
          >
        </li>
        <li
          :class="[pagination.current_page === index + 1 ? 'active' : '', 'page-item']"
          v-for="(page, index) in pagination.total_pages"
          :key="index"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(index + 1)">{{ index + 1 }}</a>
        </li>
        <li
          :class="[
            pagination.current_page === pagination.total_pages ? 'disabled' : '',
            'page-item'
          ]"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import apis from '@/apis/apis';

export default {
  props: ['uuid', 'loginStatus'],
  data() {
    return {
      products: [],
      pagination: {
        total: 1,
        count: 1,
        per_page: 25,
        current_page: 1,
        total_pages: 1,
        links: {},
      },
      isModalShow: false,
    };
  },
  created() {
    this.$bus.$on('products.createProduct', this.createProduct);
    this.$bus.$on('products.updateIsModalShow', this.updateIsModalShow);
    this.$bus.$on('products.updateProduct', this.updateProduct);
    if (!this.loginStatus) {
      this.getProducts();
    }
  },
  methods: {
    getProducts(page = 1) {
      apis.getProducts({ page }, (res) => {
        if (res.data) this.products = res.data;
        if (res.meta && res.meta.pagination) this.pagination = res.meta.pagination;
      });
    },
    createProduct(tempProduct) {
      apis.createProduct(tempProduct, () => {
        this.getProducts();
      });
    },
    getProduct(id, callback) {
      apis.getProduct({ id }, callback);
    },
    editProduct(type, id) {
      let title = '';
      let tempProduct = { imageUrl: [] };
      const newId = new Date().getTime();
      switch (type) {
        case 'create':
          title = 'Create Product';
          tempProduct.id = newId;
          this.updateShowModalData({ type, title, tempProduct });
          break;
        case 'edit':
          title = 'Edit Product';
          this.getProduct(id, (res) => {
            tempProduct = res.data;
            this.updateShowModalData({ type, title, tempProduct });
          });
          break;
        default:
          break;
      }
    },
    updateProduct(data) {
      apis.updateProduct(data, () => {
        this.getProducts();
      });
    },
    deleteProduct(id) {
      apis.deleteProduct({ id }, () => {
        this.getProducts();
      });
    },
    updateShowModalData(data) {
      const { type, title, tempProduct } = data;
      this.$bus.$emit('productModal.showModal', { type, title });
      this.$bus.$emit('productModal.updateTempProduct', tempProduct);
    },
    updateIsModalShow(data) {
      this.isModalShow = data;
    },
  },
  watch: {
    loginStatus(curr) {
      if (curr) {
        this.getProducts();
      }
    },
  },
};
</script>
