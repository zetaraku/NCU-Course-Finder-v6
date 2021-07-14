<template>
  <div class="ColSelectedCancel flex-centered">
    <input
      v-model="courseSelected"
      type="checkbox"
      class="form-check-input form-check-input-cancel cursor-pointer"
    >
  </div>
</template>

<script>
import * as Vue from 'vue';

export default {
  setup() {
    const course = Vue.inject('course');

    const courseSelected = Vue.computed({
      get() {
        return course.selected;
      },
      set(value) {
        // XXX: we are mutating injected state!
        course.selected = value;
      },
    });

    return {
      courseSelected,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-check-input[type="checkbox"] {
  &.form-check-input-cancel:checked {
    background-color: #dc3545;
    border-color: #dc3545;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 6l8 8M14 6l-8 8'/%3e%3c/svg%3e");
  }
}
</style>
