<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      class="my-4"
    />
    <CourseFilter
      class="my-4"
    />
    <div class="d-flex justify-content-center my-5">
      <button
        class="btn btn-lg btn-primary text-nowrap px-4"
        @click="refreshFilteredCourses"
      >
        開始多重篩選
      </button>
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

    Vue.provide('filters', filters);
    Vue.provide('filterOptions', filterOptions);

    return {
      courses,
      filteredCourses,

      refreshFilteredCourses,
    };
  },
};
</script>
