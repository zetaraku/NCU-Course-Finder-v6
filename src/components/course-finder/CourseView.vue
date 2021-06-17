<template>
  <div class="CourseView">
    <Pagination
      v-model:currentPage="currentPage"
      :page-count="pageCount"
      class="mb-4"
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
import CourseTable from '@/components/course-finder/table-view/CourseTable.vue';
import Pagination from '@/components/Pagination.vue';
import { paginate } from '@/helpers';

export default {
  components: {
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
    // pagination
    const pageSize = Vue.ref(24);
    const pageCount = Vue.computed(
      () => Math.max(1, Math.ceil(props.courses.length / pageSize.value)),
    );
    const currentPage = Vue.ref(1);
    const coursesInCurrentPage = Vue.computed(
      () => paginate(props.courses, pageSize.value, currentPage.value),
    );

    return {
      pageCount,
      currentPage,
      coursesInCurrentPage,
    };
  },
};
</script>

<style>

</style>
