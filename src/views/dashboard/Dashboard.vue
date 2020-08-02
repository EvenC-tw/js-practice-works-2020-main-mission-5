<template>
  <div>
    <div id="nav">
      <router-link :to="{ name: 'admin.products' }">商品列表</router-link>
      |
      <router-link :to="{ name: 'admin.coupons' }">優惠券</router-link>
      <span :v-if="loginData.status">
        |
        <button type="button" class="btn btn-outline-danger" @click.prevent="logout">登出</button>
      </span>
    </div>
    <router-view :loginData="loginData" />
    <login-modal @getLoginData="setLoginData" :login-status="loginData.status"></login-modal>
  </div>
</template>

<script>
import '@/styles/dashboard/custom.scss';
import apis from '@/apis/apis';
import LoginModal from '@/components/LoginModal.vue';

export default {
  components: { 'login-modal': LoginModal },
  data() {
    return {
      loginData: {
        status: false,
        expired: null,
        token: '',
      },
      isModalShow: false,
    };
  },
  created() {
    this.$bus.$on('dashboard.updateIsModalShow', this.updateIsModalShow);
    apis.checkLogin().then((res) => {
      const { success } = res;
      this.loginData.status = success;
      if (this.loginData.status) {
        this.$router.push({ name: 'admin.products' });
      } else {
        this.$router.push({ name: 'admin' });
      }
    });
  },
  methods: {
    updateIsModalShow(data) {
      this.isModalShow = data;
    },
    setLoginData(data) {
      const { success } = data;
      if (!success) return;
      this.loginData.status = success;
      this.$router.push({ name: 'admin.products' });
    },
    logout() {
      apis.logout().then((res) => {
        const { success } = res;
        if (success) {
          this.loginData.status = !success;
          this.$router.push({ name: 'admin' });
        }
      });
    },
  },
};
</script>
