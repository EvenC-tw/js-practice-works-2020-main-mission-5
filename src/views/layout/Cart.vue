<template>
  <div :class="['my-5', 'align-items-center', 'd-flex', 'flex-column', $style.container]">
    <div class="mb-3 align-self-end">
      <button type="button" class="btn btn-outline-danger btn-sm" @click="clearCart">
        <i class="far fa-trash-alt"> 刪除所有品項</i>
      </button>
    </div>
    <table class="table">
      <thead>
        <th>刪除</th>
        <th>品名</th>
        <th width="150px">
          數量
        </th>
        <th>單位</th>
        <th>單價</th>
      </thead>
      <tbody v-if="cart.length">
        <tr v-for="item in cart" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.product.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
          </td>
          <td class="align-middle">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  @click="quantityUpdate(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
              <input
                id="inlineFormInputGroupUsername"
                type="text"
                class="form-control text-center"
                :value="item.quantity"
                @input="quantityUpdate(item.product.id, $event.target.value)"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  @click="quantityUpdate(item.product.id, item.quantity - 1)"
                  :disabled="item.quantity === 1"
                >
                  -
                </button>
              </div>
            </div>
          </td>
          <td class="align-middle">
            {{ item.product.unit }}
          </td>
          <td class="align-middle">
            {{ item.product.price }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right">
            總計
          </td>
          <td class="text-right">
            {{ cartTotal }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import apis from '@/apis/modules/user';

export default {
  name: 'Cart',
  data() {
    return {
      cart: [],
      cartTotal: 0,
      tempProduct: {
        id: null,
        product: null,
        quantity: null,
      },
    };
  },
  methods: {
    clearCart() {
      this.cart = [];
      this.cartTotal = 0;
    },
    getShopping() {
      apis.getShopping().then((res) => {
        this.cart = res.data;
      });
    },
    quantityUpdate(id, val) {
      const target = this.cart.find((data) => data.product.id === id);
      target.quantity = parseInt(val, 10);
    },
  },
  created() {
    this.getShopping();
  },
};
</script>

<style lang="scss" module>
.container {
  padding: 0 4rem;
  width: 100%;
}
</style>
