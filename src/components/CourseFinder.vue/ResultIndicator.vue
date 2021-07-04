<template>
  <div class="ResultIndicator user-select-none">
    <div
      class="progress position-relative"
      style="height: 30px;"
    >
      <div
        class="progress-bar bg-warning"
        :style="{ width: `${value}%` }"
      />
      <div class="position-absolute w-100 h-100 flex-centered fs-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>
