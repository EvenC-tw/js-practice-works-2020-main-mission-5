<template>
  <div>
    <div id="nav">
      <router-link to="/admin/products">商品列表</router-link> |
      <router-link to="/admin/coupons">優惠券</router-link>
    </div>
    <router-view name="products" />
    <login-modal @getLoginData="setLoginData" :login-status="loginData.status"></login-modal>
  </div>
</template>

<script>
import LoginModal from '@/components/loginModal.vue';

export default {
  components: { 'login-modal': LoginModal },
  data() {
    return {
      isModalShow: false,
      loginStatus: false,
    };
  },
  created() {
    this.$bus.$on('dashboard.updateIsModalShow', this.updateIsModalShow);
    if (this.loginStatus) {
      // this.getProductList();
    }
  },
  methods: {
    updateIsModalShow(data) {
      this.isModalShow = data;
    },
  },
};
</script>
