<template>
  <table class="CourseTable table table-hover text-center align-middle">
    <thead>
      <CourseTableHeader :columns="columns" />
    </thead>
    <tbody>
    </tbody>
  </table>
</template>

<script>
import CourseTableHeader from './CourseTableHeader.vue';
import { columns } from './columns/data';

export default {
  components: {
    CourseTableHeader,
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>
