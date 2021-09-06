<template>
  <div
    class="MyScheduleGridCourse flex-column flex-centered py-1 position-relative"
    :class="{ 'd-print-none': course.isPlaceholder }"
  >
    <label
      class="
        position-static
        p-1 mb-1 cursor-pointer
        d-inline d-lg-none d-print-none
      "
    >
      <ColSelectedCancel />
    </label>
    <label
      class="
        position-absolute top-50 end-0 translate-middle-y
        p-2 cursor-pointer
        d-none d-lg-inline d-print-none
      "
    >
      <ColSelectedCancel />
    </label>
    <div class="w-100">
      <ColClassNo class="fw-bold d-print-none" />
      <ColTitle />
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as ColComponents from '@/components/CourseFinder.vue/CourseView.vue/ColComponents';

export default {
  components: {
    ...ColComponents,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    Vue.provide('course', props.course);
  },
};
</script>

<style lang="scss" scoped>
.MyScheduleGridCourse {
  font-size: calc(0.8em + 0.4vw);

  @media screen and (max-width: 575.98px) {
    .ColClassNo, .ColTitle {
      font-size: x-small;
    }
  }

  @media print {
    .ColTitle a {
      color: var(--bs-dark) !important;
    }
  }
}
</style>
