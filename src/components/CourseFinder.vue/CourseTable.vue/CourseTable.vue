<template>
  <div class="CourseTable">
    <table class="table table-hover text-center align-middle">
      <thead>
        <CourseTableHeader :columns="columns" />
      </thead>
      <tbody>
        <CourseTableRow
          v-for="course in courses"
          :key="course.serialNo"
          :columns="columns"
          :course="course"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import CourseTableHeader from './CourseTableHeader.vue';
import CourseTableRow from './CourseTableRow.vue';
import { columns } from './Col/data';

export default {
  components: {
    CourseTableHeader,
    CourseTableRow,
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
