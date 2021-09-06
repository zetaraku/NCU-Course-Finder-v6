<template>
  <small class="d-inline-block text-muted p-1 d-print-none">
    共 {{ totalCredits }} 學分
  </small>
  <div class="MyScheduleGrid day">
    <template
      v-for="dayHour in DAY_HOURS"
      :key="dayHour.key"
    >
      <MyScheduleGridTile
        v-if="dayHour.hour.page === 1 && !dayHour.day.isWeekend"
        :day-hour="dayHour"
        :courses="classTimeCoursesMapping.get(dayHour.key)"
        :style="{ 'grid-column': 1 + dayHour.i, 'grid-row': 1 + dayHour.j }"
      />
    </template>
  </div>
  <div class="MyScheduleGrid night">
    <template
      v-for="dayHour in DAY_HOURS"
      :key="dayHour.key"
    >
      <MyScheduleGridTile
        v-if="dayHour.hour.page === 2 && !dayHour.day.isWeekend"
        :day-hour="dayHour"
        :courses="classTimeCoursesMapping.get(dayHour.key)"
        :style="{ 'grid-column': 1 + dayHour.i, 'grid-row': 1 + dayHour.j - (9) }"
      />
    </template>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { DAY_HOURS } from '@/consts';
import MyScheduleGridTile from './MyScheduleGridTile.vue';

export default {
  components: {
    MyScheduleGridTile,
  },
  setup() {
    const store = Vuex.useStore();

    const totalCredits = Vue.computed(
      () => store.getters.selectedCourses.reduce((acc, e) => acc + e.credit, 0),
    );
    const classTimeCoursesMapping = Vue.computed(() => {
      let result = new Map(
        DAY_HOURS.map(dayHour => [dayHour.key, []]),
      );

      for (let course of store.getters.selectedCourses) {
        for (let classTime of course.classTimes) {
          result.get(classTime)?.push(course);
        }
      }

      return result;
    });

    return {
      DAY_HOURS,

      totalCredits,
      classTimeCoursesMapping,
    };
  },
};
</script>

<style lang="scss" scoped>
.MyScheduleGrid {
  display: grid;
  justify-content: center;
  gap: 10px 10px;
  margin: 0 -10px;

  grid-template-columns: 0 repeat(5, minmax(0, 1fr)) 0;

  &.day {
    grid-template-rows: repeat(10, auto);
  }
  &.night {
    grid-template-rows: repeat(4, auto);
  }

  @media print {
    page-break-inside: avoid;
  }
}
</style>
