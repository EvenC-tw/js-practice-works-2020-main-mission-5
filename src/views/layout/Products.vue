<template>
  <div>
    <h2>這是產品頁</h2>
    <div :class="[$style['container']]">
      <div :class="['card', $style['wrapper']]" v-for="product in products" :key="product.id">
        <img
          :class="['card-img-top', $style['img']]"
          :src="product.imageUrl[0]"
          alt="Card image cap"
        />
        <div :class="['card-body', $style['body']]">
          <h5 class="card-title">{{ product.title }}</h5>
          <span class="card-text"> 內容: {{ product.content }} </span>
          <span class="card-text"> 單位: {{ product.unit }} </span>
          <span class="card-text"> 價格: {{ product.price }} </span>
          <button type="button" class="btn btn-outline-danger" @click="insertShopping(product.id)">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '@/apis/modules/user';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      shopping: {},
    };
  },
  methods: {
    getProducts() {
      apis.getProducts().then((res) => {
        this.products = res.data;
      });
    },
    getShopping() {
      apis.getShopping().then((res) => {
        this.shopping = res.data;
      });
    },
    insertShopping(id, quantity = 1) {
      apis.insertShopping({ product: id, quantity }).then((res) => {
        this.shopping = res.data;
        this.getShopping();
      });
    },
  },
  created() {
    this.getProducts();
    this.getShopping();
  },
};
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .wrapper {
    width: 160px;
    margin: 1rem;
    // .img {
    //   width: 100%;
    //   padding: 0.25rem;
    // }
    .body {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
