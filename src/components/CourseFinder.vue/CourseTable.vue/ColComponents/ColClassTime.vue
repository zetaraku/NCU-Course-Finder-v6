<template>
  <div class="ColClassTime d-flex justify-content-center flex-wrap">
    <span
      v-for="classTime in course.classTimes"
      :key="classTime"
      class="badge rounded-pill bg-primary font-monospace m-1"
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
</template>

<script>
export default {
  inject: ['course'],
};
</script>
