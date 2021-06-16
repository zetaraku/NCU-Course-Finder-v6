<template>
  <div class="CourseFinder container my-4">
    <DataStatusIndicator
      :last-update-time="lastUpdateTime"
      :error-message="errorMessage"
      class="my-4"
    />
    <Pagination
      v-model:currentPage="currentPage"
      :page-count="pageCount"
      class="my-4"
    />
    <CourseTable
      :courses="coursesInCurrentPage"
      class="my-4"
    />
    <Pagination
      v-model:currentPage="currentPage"
      :page-count="pageCount"
      class="my-4"
    />
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import DataStatusIndicator from '@/components/DataStatusIndicator.vue';
import CourseTable from '@/components/course-finder/table-view/CourseTable.vue';
import Pagination from '@/components/Pagination.vue';
import { paginate } from '@/helpers';

export default {
  components: {
    DataStatusIndicator,
    CourseTable,
    Pagination,
  },
  setup() {
    const store = Vuex.useStore();

    const courses = Vue.computed(() => store.state.courses);
    const lastUpdateTime = Vue.computed(() => store.state.lastUpdateTime);
    const errorMessage = Vue.computed(() => store.state.errorMessage);

    // pagination
    const pageSize = Vue.ref(24);
    const pageCount = Vue.computed(
      () => Math.max(1, Math.ceil(courses.value.length / pageSize.value)),
    );
    const currentPage = Vue.ref(1);
    const coursesInCurrentPage = Vue.computed(
      () => paginate(courses.value, pageSize.value, currentPage.value),
    );

    return {
      courses,
      lastUpdateTime,
      errorMessage,

      pageCount,
      currentPage,
      coursesInCurrentPage,
    };
  },
};
</script>

<style>

</style>
