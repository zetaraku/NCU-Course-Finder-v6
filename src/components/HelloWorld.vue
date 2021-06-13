<template>
  <div class="HelloWorld">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >

    <h1>{{ msg }}</h1>

    <p>
      <a href="https://vitejs.dev/guide/features.html">
        Vite Documentation
      </a>
      |
      <a href="https://v3.vuejs.org/">Vue 3 Documentation</a>
    </p>

    <button
      type="button"
      @click="state.count++"
    >
      count is: {{ state.count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<script>
import * as Vue from 'vue';

export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const state = Vue.reactive({ count: 0 });

    return {
      state,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
.HelloWorld {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
