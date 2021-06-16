<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      :last-update-time="lastUpdateTime"
      :error-message="errorMessage"
      class="my-4"
    />
    <CourseTable
      :courses="coursesInCurrentPage"
      class="my-4"
    />
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import DataStatusIndicator from '@/components/DataStatusIndicator.vue';
import CourseTable from '@/components/course-finder/table-view/CourseTable.vue';

export default {
  components: {
    DataStatusIndicator,
    CourseTable,
  },
  setup() {
    const store = Vuex.useStore();

    const courses = Vue.computed(() => store.state.courses);
    const lastUpdateTime = Vue.computed(() => store.state.lastUpdateTime);
    const errorMessage = Vue.computed(() => store.state.errorMessage);

    const coursesInCurrentPage = Vue.computed(
      () => courses.value.slice(0, 24),
    );

    return {
      courses,
      lastUpdateTime,
      errorMessage,

      coursesInCurrentPage,
    };
  },
};
</script>

<style>

</style>
