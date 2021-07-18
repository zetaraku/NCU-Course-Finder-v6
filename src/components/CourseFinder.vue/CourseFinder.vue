<template>
  <template v-if="$store.state.loadingState !== 'loaded'">
    <LoadingView />
  </template>
  <template v-else>
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
</template>

<script>
/* eslint-disable object-curly-newline */
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { filterCourses } from '@/helpers';
import LoadingView from '@/components/LoadingView.vue';
import DataStatusIndicator from './DataStatusIndicator.vue';
import CourseFilter from './CourseFilter.vue';
import ResultIndicator from './ResultIndicator.vue';
import CourseView from './CourseView.vue';

export default {
  components: {
    LoadingView,
    DataStatusIndicator,
    CourseFilter,
    ResultIndicator,
    CourseView,
  },
  setup() {
    const store = Vuex.useStore();

    const courses = Vue.computed(() => store.state.courses);
    const selectedClassTimes = Vue.computed(() => store.getters.selectedClassTimes);

    const filters = Vue.inject('filters');
    const filteredCourses = Vue.computed(() => filterCourses(courses.value, filters));

    // reset department/category filter when the college filter is changed
    Vue.watch(() => filters.collegeId, () => {
      filters.departmentId = null;
      filters.classPrefix = null;
    });

    return {
      courses,
      filteredCourses,
      selectedClassTimes,
    };
  },
};
</script>
