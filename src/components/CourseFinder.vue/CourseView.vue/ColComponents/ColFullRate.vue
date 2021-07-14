<template>
  <div class="ColFullRate flex-centered">
    <div
      class="progress position-relative w-100"
      style="height: 30px; background-color: #ddd;"
    >
      <div
        class="progress-bar"
        style="background-color: #ffa500;"
        :style="{ 'width': `${clamp(course.fullRate, 0, 100)}%` }"
      />
      <div
        class="position-absolute w-100 h-100 fs-6 text-nowrap flex-centered"
      >
        {{ formatNumber(course.admitCnt) }} / {{ formatNumber(course.limitCnt) }}
        ({{ formatNumber(course.fullRate, 1) }}%)
      </div>
    </div>
  </div>
</template>

<script>
import { clamp, formatNumber } from '@/helpers';

export default {
  inject: ['course'],
  setup() {
    return {
      clamp,
      formatNumber,
    };
  },
};
</script>
