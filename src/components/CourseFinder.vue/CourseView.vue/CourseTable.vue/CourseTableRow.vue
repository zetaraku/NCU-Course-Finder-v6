<template>
  <tr
    class="CourseTableRow"
    :class="{ 'bg-warning': course.selected }"
  >
    <td style="width: 60px;">
      <ColCourseType class="fs-5" />
    </td>
    <td style="width: 120px;">
      <ColClassNo class="fs-5" />
    </td>
    <td style="width: 200px; max-width: 200px;">
      <ColTitle />
    </td>
    <td style="width: 125px;">
      <ColTeachers />
    </td>
    <td style="width: 85px;">
      <ColCredit />
    </td>
    <td style="width: 140px;">
      <ColSuccessRate />
    </td>
    <td style="width: 140px;">
      <ColFullRate />
    </td>
    <td style="width: 175px;">
      <ColClassTime class="fs-5" />
    </td>
    <td style="width: 60px;">
      <label class="p-2 cursor-pointer">
        <ColSelected />
      </label>
    </td>
  </tr>
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
