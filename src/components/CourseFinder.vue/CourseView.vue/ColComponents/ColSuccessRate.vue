<template>
  <div
    class="ColSuccessRate progress position-relative"
    style="height: 30px; background-color: #ddd;"
  >
    <div
      class="progress-bar"
      :style="{
        width: `${clamp(course.successRate, 0, 100)}%`,
        backgroundColor: '#00ff00',
      }"
    />
    <div
      class="position-absolute w-100 h-100 fs-6 text-nowrap flex-centered"
    >
      {{ formatNumber(course.remainCnt) }} / {{ formatNumber(course.waitCnt) }}
      ({{ formatNumber(course.successRate, 1) }}%)
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
