<template>
  <div class="ColClassTime flex-centered">
    <div class="d-flex flex-wrap justify-content-center">
      <span
        v-for="classTime in course.classTimes"
        :key="classTime"
        class="badge rounded-pill bg-primary font-monospace m-1"
        :class="`ClassTime-${classTime}`"
      >
        {{ classTime }}
      </span>
      <span
        v-if="course.classTimes.length === 0"
        class="text-muted fs-6"
      >
        未提供
      </span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['course'],
};
</script>

<style lang="scss" scoped>
$days: 0, 1, 2, 3, 4, 5, 6;
$hours: 1, 2, 3, 4, Z, 5, 6, 7, 8, 9, A, B, C, D;

@each $day in $days {
  @each $hour in $hours {
    .SelectedClassTime-#{$day}-#{$hour} .ClassTime-#{$day}-#{$hour} {
      background-color: var(--bs-danger) !important;
    }
  }
}
</style>
