<template>
  <div
    class="CourseGridTile card position-relative"
    :class="{ 'bg-warning': course.selected }"
  >
    <div class="card-body row flex-column align-content-start text-center gy-2">
      <div class="d-flex justify-content-center">
        <ColCourseType class="me-2" />
        <ColClassNo />
      </div>
      <div class="d-flex justify-content-center flex-grow-1">
        <ColTitle />
      </div>
      <div>
        <ColTeachers />
      </div>
      <div>
        <ColCredit />
      </div>
      <div>
        <ColSuccessRate />
      </div>
      <div>
        <ColFullRate />
      </div>
      <div class="flex-centered mt-3">
        <ColClassTime />
        <ColClassRoom />
      </div>
      <div class="m-0">
        <label class="position-absolute top-0 end-0 px-2 py-1 m-sm-1 cursor-pointer">
          <ColSelected />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as ColComponents from '../ColComponents';

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
