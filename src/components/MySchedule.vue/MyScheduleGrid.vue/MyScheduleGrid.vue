<template>
  <div class="MyScheduleGrid">
    <template
      v-for="dayHour in DAY_HOURS"
      :key="dayHour.key"
    >
      <div
        v-if="!dayHour.day.isWeekend"
        class="border text-muted text-center p-2"
        style="min-height: 120px;"
        :style="{ 'grid-column': 1 + dayHour.i, 'grid-row': 1 + dayHour.j }"
      >
        <label>
          {{ dayHour.key }}
        </label>
      </div>
    </template>
  </div>
</template>

<script>
import { DAY_HOURS } from '@/consts';

export default {
  setup() {
    return {
      DAY_HOURS,
    };
  },
};
</script>

<style lang="scss" scoped>
.MyScheduleGrid {
  display: grid;
  justify-content: center;
  grid-template-columns: 0 repeat(5, minmax(0, 1fr)) 0;
  grid-template-rows: repeat(14, auto);
  gap: 10px 10px;
  margin: 0 -10px;
}
</style>
