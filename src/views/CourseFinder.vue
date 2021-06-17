<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      :last-update-time="lastUpdateTime"
      :error-message="errorMessage"
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
import DataStatusIndicator from '@/components/DataStatusIndicator.vue';
import CourseView from '@/components/course-finder/CourseView.vue';

export default {
  components: {
    DataStatusIndicator,
    CourseView,
  },
  setup() {
    const store = Vuex.useStore();

    const courses = Vue.computed(() => store.state.courses);
    const lastUpdateTime = Vue.computed(() => store.state.lastUpdateTime);
    const errorMessage = Vue.computed(() => store.state.errorMessage);

    return {
      courses,
      lastUpdateTime,
      errorMessage,
    };
  },
};
</script>

<style>

</style>
