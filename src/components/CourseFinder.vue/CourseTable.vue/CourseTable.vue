<template>
  <div class="CourseTable">
    <table class="table table-hover text-center align-middle">
      <thead>
        <CourseTableHeader />
      </thead>
      <tbody>
        <CourseTableRow
          v-for="course in courses"
          :key="course.serialNo"
          :course="course"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import CourseTableHeader from './CourseTableHeader.vue';
import CourseTableRow from './CourseTableRow.vue';

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
};
</script>
