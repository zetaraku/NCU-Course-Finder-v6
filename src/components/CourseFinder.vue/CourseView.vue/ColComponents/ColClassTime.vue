<template>
  <div class="ColClassTime d-flex justify-content-center flex-wrap">
    <span
      v-for="classTime in course.classTimes"
      :key="classTime"
      class="badge rounded-pill font-monospace m-1"
      :class="selectedClassTimes.has(classTime) ? 'bg-danger' : 'bg-primary'"
    >
      {{ classTime }}
    </span>
    <span
      v-if="course.classTimes.length === 0"
      class="text-muted fs-6"
    >
      未提供
    </span>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';

export default {
  inject: ['course'],
  setup() {
    const store = Vuex.useStore();
    const selectedClassTimes = Vue.computed(() => store.getters.selectedClassTimes);

    return {
      selectedClassTimes,
    };
  },
};
</script>
