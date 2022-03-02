<template>
  <div class="MyScheduleHeader mb-5">
    <div class="position-relative">
      <button
        class="btn btn-outline-danger btn-sm position-absolute bottom-0 start-0 d-print-none"
        @click="clearSchedule"
      >
        <i class="bi bi-trash me-1" />
        清空<span class="d-none d-sm-inline">課表</span>
      </button>
      <h1 class="text-center">
        我的課表
      </h1>
      <button
        class="btn btn-outline-primary btn-sm position-absolute bottom-0 end-0 d-print-none"
        @click="printSchedule"
      >
        <i class="bi bi-printer me-1" />
        列印<span class="d-none d-sm-inline">課表</span>
      </button>
    </div>
    <p class="text-center text-secondary mt-3 d-print-none">
      ※你可以在課程查詢頁勾選課程來將課程加入我的課表
    </p>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import * as VueGtag from 'vue-gtag-next';

export default {
  setup() {
    const store = Vuex.useStore();
    const gtag = VueGtag.useGtag();

    const courses = Vue.computed(() => store.state.courses);

    return {
      clearSchedule() {
        for (let course of courses.value) {
          course.selected = false;
        }
      },
      printSchedule() {
        window.print();
        gtag.event('PrintSchedule');
      },
    };
  },
};
</script>
