<template>
  <div>
    <button type="button" class="btn btn-primary float-right" @click="editProduct('create')">
      Create
    </button>
    <h1 class="text-left">List of Products</h1>
    <table class="table">
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
    <product-modal
      :showProductModal="showProductModal"
      :tempProduct="tempProduct"
      @closeModal="closeProductModal"
      @createProduct="createProduct"
      @updateProduct="updateProduct"
    ></product-modal>
  </div>
</template>

<script>
import apis from '@/apis/apis';
import ProductModal from '@/components/ProductModal.vue';

export default {
  props: ['loginData'],
  components: { 'product-modal': ProductModal },
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
      showProductModal: { enable: false, type: null, title: '' },
      tempProduct: {},
    };
  },
  created() {},
  methods: {
    getProducts(page = 1) {
      apis.getProducts({ page }).then((res) => {
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
      apis.getProduct({ id }).then(callback);
    },
    editProduct(type, id) {
      let title = '';
      const tempProduct = { imageUrl: [] };
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
            this.tempProduct = res.data;
            this.showProductModal = {
              enable: true,
              type,
              title,
            };
          });
          break;
        default:
          break;
      }
    },
    updateProduct() {
      apis.updateProduct(this.tempProduct).then(() => {
        this.getProducts();
      });
    },
    deleteProduct(id) {
      apis.deleteProduct({ id }, () => {
        this.getProducts();
      });
    },
    closeProductModal(data) {
      this.showProductModal = data;
    },
  },
  watch: {
    loginData: {
      immediate: true,
      deep: true,
      handler(curr) {
        if (curr.status) {
          this.getProducts();
        }
      },
    },
  },
};
</script>
