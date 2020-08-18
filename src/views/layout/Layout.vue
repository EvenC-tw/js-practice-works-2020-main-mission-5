<template>
  <div>
    <div id="nav">
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {};
  },
};
</script>
