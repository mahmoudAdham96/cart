<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
    <products></products>
  </div>
</template>

<script>
import TheHeader from "./components/nav/TheHeader.vue";
import products from './components/products/products.vue';

export default {
  components: {
    TheHeader,
    products,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
