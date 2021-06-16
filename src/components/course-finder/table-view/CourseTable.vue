<template>
  <table class="CourseTable table table-hover text-center align-middle">
    <thead>
    </thead>
    <tbody>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
    };
  },
};
</script>
