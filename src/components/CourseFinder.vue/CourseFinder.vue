<template>
  <div
    class="CourseFinder container my-4"
    :class="[...selectedClassTimes.keys()].map(classTime => `SelectedClassTime-${classTime}`)"
  >
    <DataStatusIndicator
      class="my-4"
    />
    <CourseFilter
      class="my-4"
    />
    <FilteringControls
      class="my-5"
      @reset-filters="resetFilters"
      @refresh-filtered-courses="refreshFilteredCourses"
    />
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
import { makeFilters, filterCourses } from '@/helpers';
import DataStatusIndicator from './DataStatusIndicator.vue';
import CourseFilter from './CourseFilter.vue';
import FilteringControls from './FilteringControls.vue';
import ResultIndicator from './ResultIndicator.vue';
import CourseView from './CourseView.vue';

export default {
  components: {
    DataStatusIndicator,
    CourseFilter,
    FilteringControls,
    ResultIndicator,
    CourseView,
  },
  setup() {
    const store = Vuex.useStore();

    const courses = Vue.computed(() => store.state.courses);
    const selectedClassTimes = Vue.computed(() => store.getters.selectedClassTimes);

    const filters = Vue.inject('filters');
    const autoFilteringEnabled = Vue.inject('autoFilteringEnabled');

    const filteredCourses = Vue.ref([]);

    function refreshFilteredCourses() {
      filteredCourses.value = filterCourses(courses.value, filters);
    }
    function resetFilters() {
      // make new filters to override the old ones
      Object.assign(filters, makeFilters());
      // manually refresh filteredCourses when auto-filtering is not enabled
      if (!autoFilteringEnabled.value) refreshFilteredCourses();
    }

    // reset department/category filter when the college filter is changed
    Vue.watch(() => filters.collegeId, () => {
      filters.departmentId = null;
      filters.classPrefix = null;
    });

    // refresh filteredCourses on courses changed (loaded)
    // and also on page load in case the courses is already loaded beforehand
    Vue.watch(courses, () => {
      refreshFilteredCourses();
    }, { immediate: true });

    // refresh filteredCourses on filters changed if auto-filtering is enabled
    Vue.watch([filters, autoFilteringEnabled], () => {
      if (autoFilteringEnabled.value) refreshFilteredCourses();
    });

    return {
      courses,
      filteredCourses,
      selectedClassTimes,

      resetFilters,
      refreshFilteredCourses,
    };
  },
};
</script>
