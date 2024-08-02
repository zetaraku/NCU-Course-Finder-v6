<template>
  <div class="LoadingView container flex-column flex-centered vh-100 pt-5">
    <i
      class="bi bi-tree-fill d-inline-block mb-3"
      style="font-size: 42px; color: DarkCyan;"
    />
    <span class="fs-3 mb-3">
      {{ ENV.VITE_APP_TITLE }}
    </span>
    <template v-if="loadingState === 'pending'">
      <h1 class="text-secondary">
        等待載入資料
      </h1>
    </template>
    <template v-if="loadingState === 'fetching'">
      <h1 class="text-secondary">
        取得資料中
      </h1>
    </template>
    <template v-if="loadingState === 'loading'">
      <h1 class="text-primary">
        資料載入中
      </h1>
    </template>
    <template v-if="loadingState === 'loaded'">
      <h1 class="text-primary">
        資料載入完成
      </h1>
    </template>
    <template v-if="loadingState === 'error'">
      <h1 class="text-danger">
        資料載入失敗
      </h1>
    </template>
    <div
      class="font-monospace text-center mt-3"
      style="height: 3rem;"
    >
      <!-- ({{ loadingState }}) -->
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';

export default {
  setup() {
    const store = Vuex.useStore();

    const loadingState = Vue.computed(() => store.state.loadingState);
    const errorMessage = Vue.computed(() => store.state.errorMessage);

    return {
      ENV: import.meta.env,

      loadingState,
      errorMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.LoadingView {
  margin-top: -70px;
}
</style>
