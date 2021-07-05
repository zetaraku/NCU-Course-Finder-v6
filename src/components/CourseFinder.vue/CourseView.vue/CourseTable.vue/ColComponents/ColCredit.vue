<template>
  <div class="ColCredit">
    <span class="fs-4">{{ course.credit }}</span> <small>學分</small>
  </div>
</template>

<script>
export default {
  inject: ['course'],
};
</script>
