<template>
  <div class="CourseView">
    <Pagination
      v-model:currentPage="currentPage"
      :page-count="pageCount"
      class="mb-4"
    />
    <CourseGrid
      :courses="coursesInCurrentPage"
      class="my-4 d-block d-xl-none"
    />
    <CourseTable
      :courses="coursesInCurrentPage"
      class="my-4 d-none d-xl-block"
    />
    <Pagination
      v-model:currentPage="currentPage"
      :page-count="pageCount"
      class="mt-4"
    />
  </div>
</template>

<script>
import * as Vue from 'vue';
import { sortCourses, paginate } from '@/helpers';
import CourseGrid from './CourseGrid.vue';
import CourseTable from './CourseTable.vue';
import Pagination from './Pagination.vue';

export default {
  components: {
    CourseGrid,
    CourseTable,
    Pagination,
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // sorting
    const sorting = Vue.ref({
      column: null,
      order: 'asc',
    });
    const sortedCourses = Vue.computed(
      () => sortCourses(props.courses, sorting.value),
    );

    // pagination
    const pageSize = Vue.ref(24);
    const pageCount = Vue.computed(
      () => Math.max(1, Math.ceil(sortedCourses.value.length / pageSize.value)),
    );
    const currentPage = Vue.ref(1);
    const coursesInCurrentPage = Vue.computed(
      () => paginate(sortedCourses.value, pageSize.value, currentPage.value),
    );

    // reset the sorting order when the sorting column changed
    Vue.watch(() => sorting.value.column, () => {
      sorting.value.order = 'asc';
    });

    // Jump to the first page when the result courses changed
    Vue.watch(sortedCourses, () => {
      currentPage.value = 1;
    });

    // provide sorting option to inner table header
    Vue.provide('sorting', sorting);

    return {
      pageCount,
      currentPage,
      coursesInCurrentPage,
    };
  },
};
</script>
