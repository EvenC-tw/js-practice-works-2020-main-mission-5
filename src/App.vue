<template>
  <div id="app">
    <router-view />
    <loading :active.sync="isLoading" :can-cancel="canCancel" :is-full-page="isFullPage"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isLoading: false,
      canCancel: true,
      isFullPage: true,
    };
  },
  components: {
    Loading,
  },
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
