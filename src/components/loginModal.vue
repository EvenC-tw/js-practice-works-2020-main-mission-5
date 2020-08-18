<template>
  <div
    :class="[modal.enable ? modal.enableClass : '', 'modal fade']"
    tabindex="-1"
    role="dialog"
    aria-labelledby="LoginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100" id="LoginModalLabel">{{ modal.title }}</h5>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="email" class="w-100 text-left">信箱</label>
              <input
                id="email"
                v-model="loginForm.email"
                class="form-control"
                type="text"
                name=""
                placeholder="請輸入email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password" class="w-100 text-left">密碼</label>
              <input
                id="password"
                v-model="loginForm.password"
                class="form-control"
                type="password"
                name=""
                placeholder="請輸入密碼"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleLogin">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '@/apis/modules/admin';

export default {
  props: ['loginStatus'],
  data() {
    return {
      modal: {
        enable: null,
        enableClass: 'show d-block login-modal',
        title: '後台登入',
        type: '',
      },
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleLogin() {
      apis.login(this.loginForm).then((res) => {
        this.$emit('getLoginData', res);
        this.$bus.$emit('dashboard.updateIsModalShow', false);
      });
    },
  },
  created() {
    this.modal.enable = !this.loginStatus;
    this.$bus.$emit('dashboard.updateIsModalShow', this.modal.enable);
  },
  watch: {
    loginStatus(curr) {
      this.modal.enable = !curr;
      this.$bus.$emit('dashboard.updateIsModalShow', this.modal.enable);
    },
  },
};
</script>
