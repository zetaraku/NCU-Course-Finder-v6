<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      class="my-4"
    />
    <CourseFilter
      class="my-4"
    />
    <div class="d-flex justify-content-center my-5">
      <div class="d-flex flex-column align-items-center mx-2 mx-sm-3">
        <button
          class="btn btn-lg btn-primary text-nowrap px-sm-4"
          :disabled="autoFilteringEnabled"
          @click="refreshFilteredCourses"
        >
          開始多重篩選
        </button>
        <label
          v-tooltip.bottom="'※請注意：啟用此選項可能會造成設定篩選條件時的延遲'"
          class="form-check-label text-nowrap user-select-none cursor-pointer mt-3"
        >
          <input
            v-model="autoFilteringEnabled"
            type="checkbox"
            class="form-check-input cursor-pointer m-1"
          >
          自動套用
          <i class="bi bi-info-circle ms-1" />
        </label>
      </div>
    </div>
    <ResultIndicator
      :value="100 * filteredCourses.length / courses.length"
      class="my-5"
    >
      共找到 {{ filteredCourses.length }} / {{ courses.length }} 筆符合的課程
    </ResultIndicator>
    <CourseView
      :courses="filteredCourses"
      class="my-4"
    />
  </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { makeFilters, makeFilterOptions, filterCourses } from '@/helpers';
import DataStatusIndicator from './DataStatusIndicator.vue';
import CourseFilter from './CourseFilter.vue';
import ResultIndicator from './ResultIndicator.vue';
import CourseView from './CourseView.vue';

export default {
  components: {
    DataStatusIndicator,
    CourseFilter,
    ResultIndicator,
    CourseView,
  },
  setup() {
    const store = Vuex.useStore();

    const colleges = Vue.computed(() => store.state.colleges);
    const departments = Vue.computed(() => store.state.departments);
    const courses = Vue.computed(() => store.state.courses);
    const selectedClassTimes = Vue.computed(() => store.getters.selectedClassTimes);

    const filters = makeFilters();
    const filterOptions = makeFilterOptions({
      colleges, departments, courses, filters, selectedClassTimes,
    });

    const filteredCourses = Vue.ref([]);
    const autoFilteringEnabled = Vue.ref(false);

    function refreshFilteredCourses() {
      filteredCourses.value = filterCourses(courses.value, filters);
    }

    // reset department/category filter when the college filter is changed
    Vue.watch(() => filters.collegeId, () => {
      filters.departmentId = null;
      filters.classPrefix = null;
    });

    // refresh filteredCourses on courses changed (loaded)
    Vue.watch(courses, () => {
      refreshFilteredCourses();
    });

    // refresh filteredCourses on filters changed if auto-filtering is enabled
    Vue.watch([filters, autoFilteringEnabled], () => {
      if (autoFilteringEnabled.value) refreshFilteredCourses();
    });

    Vue.provide('filters', filters);
    Vue.provide('filterOptions', filterOptions);

    return {
      courses,
      filteredCourses,
      autoFilteringEnabled,

      refreshFilteredCourses,
    };
  },
};
</script>
