<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      class="my-4"
    />
    <CourseFilter
      class="my-4"
    />
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
import CourseView from './CourseView.vue';

export default {
  components: {
    DataStatusIndicator,
    CourseFilter,
    CourseView,
  },
  setup() {
    const store = Vuex.useStore();

    const colleges = Vue.computed(() => store.state.colleges);
    const departments = Vue.computed(() => store.state.departments);
    const courses = Vue.computed(() => store.state.courses);

    const filters = makeFilters();
    const filterOptions = makeFilterOptions({ colleges, departments, courses, filters });

    const filteredCourses = Vue.computed(
      () => filterCourses(courses.value, filters),
    );

    // reset department/category filter when the college filter is changed
    Vue.watch(() => filters.collegeId, () => {
      filters.departmentId = null;
      filters.classPrefix = null;
    });

    Vue.provide('filters', filters);
    Vue.provide('filterOptions', filterOptions);

    return {
      courses,
      filteredCourses,
    };
  },
};
</script>

<style>

</style>
