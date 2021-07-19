<template>
  <div
    class="MyScheduleGridTile d-flex flex-column border text-center px-1 px-lg-2 py-2"
    :class="{ 'd-print-none': dayHour.hour.hideInPrint }"
    :style="{ 'background-color': dayHour.hour.backgroundColor }"
  >
    <label class="flex-grow-0 text-muted">
      <small>{{ dayHour.key }}</small>
    </label>
    <MyScheduleGridCourse
      v-for="course in courses"
      :key="course.serialNo"
      :course="course"
      class="flex-grow-1"
    />
    <MyScheduleGridReserve
      v-if="courses.length === 0"
      :day-hour="dayHour"
      class="flex-grow-1"
    />
  </div>
</template>

<script>
import MyScheduleGridCourse from './MyScheduleGridCourse.vue';
import MyScheduleGridReserve from './MyScheduleGridReserve.vue';

export default {
  components: {
    MyScheduleGridCourse,
    MyScheduleGridReserve,
  },
  props: {
    dayHour: {
      type: Object,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.MyScheduleGridTile {
  min-height: 120px;

  @media print {
    min-height: 90px;
    border-color: var(--bs-gray-dark) !important;
  }
}
</style>
