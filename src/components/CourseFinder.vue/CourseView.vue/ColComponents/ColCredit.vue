<template>
  <div class="ColCredit flex-centered">
    <span>
      <span class="fs-4">{{ course.credit }}</span>
      <small class="ms-1">學分</small>
    </span>
  </div>
</template>

<script>
export default {
  inject: ['course'],
};
</script>
