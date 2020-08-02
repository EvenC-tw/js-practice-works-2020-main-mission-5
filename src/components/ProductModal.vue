<template>
  <div
    :class="[showProductModal.enable ? modal.enableClass : '', 'modal fade']"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ProductModalLabel">{{ showProductModal.title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="hideModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="imageUrl">Image Url</label>
              <input
                id="imageUrl"
                :v-model="tempProduct.imageUrl && tempProduct.imageUrl[0]"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <img
              v-if="tempProduct.imageUrl && tempProduct.imageUrl[0]"
              :src="tempProduct.imageUrl && tempProduct.imageUrl[0]"
              class="img-fluid"
              alt="image preview"
            />
            <div class="form-group">
              <label for="title">Title</label>
              <input
                id="title"
                v-model="tempProduct.title"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <input
                id="category"
                v-model="tempProduct.category"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="unit">Unit</label>
              <input
                id="unit"
                v-model="tempProduct.unit"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="origin_price">List Price</label>
              <input
                id="origin_price"
                v-model="tempProduct.origin_price"
                class="form-control"
                type="number"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="price">Retail Price</label>
              <input
                id="price"
                v-model="tempProduct.price"
                class="form-control"
                type="number"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="description">Description </label>
              <input
                id="description"
                v-model="tempProduct.description"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <input
                id="content"
                v-model="tempProduct.content"
                class="form-control"
                type="text"
                name=""
              />
            </div>
            <div class="form-check">
              <input
                id="enable"
                class="form-check-input"
                type="checkbox"
                name=""
                v-model="tempProduct.enabled"
              />
              <label for="enable" class="form-check-label">Enable</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['showProductModal', 'tempProduct'],
  data() {
    return {
      modal: {
        enableClass: 'show d-block',
        title: '',
        type: '',
      },
      //   product: {}
    };
  },
  created() {},
  watch: {
    showProductModal: {
      deep: true,
      handler(curr) {
        this.$bus.$emit('dashboard.updateIsModalShow', curr.enable);
      },
    },
    // tempProduct: {
    //   deep: true,
    //   handler(curr) {
    //     this.product = { ...curr };
    //   }
    // }
  },
  methods: {
    updateProduct() {
      switch (this.showProductModal.type) {
        case 'create':
          this.$emit('createProduct', { ...this.tempProduct });
          break;
        case 'edit':
          this.$emit('updateProduct', {
            id: this.tempProduct.id,
            tempProduct: { ...this.tempProduct },
          });
          break;
        default:
          break;
      }
      this.hideModal();
    },
    hideModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>
