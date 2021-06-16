<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      :last-update-time="lastUpdateTime"
      :error-message="errorMessage"
      class="my-4"
    />
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import DataStatusIndicator from '@/components/DataStatusIndicator.vue';

export default {
  components: {
    DataStatusIndicator,
  },
  setup() {
    const store = Vuex.useStore();

    const lastUpdateTime = Vue.computed(() => store.state.lastUpdateTime);
    const errorMessage = Vue.computed(() => store.state.errorMessage);

    return {
      lastUpdateTime,
      errorMessage,
    };
  },
};
</script>

<style>

</style>
