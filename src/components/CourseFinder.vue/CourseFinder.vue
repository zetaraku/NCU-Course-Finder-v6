<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      class="my-4"
    />
    <CourseFilter
      class="my-4"
    />
    <CourseView
      :courses="courses"
      class="my-4"
    />
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
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

    const courses = Vue.computed(() => store.state.courses);

    return {
      courses,
    };
  },
};
</script>

<style>

</style>
