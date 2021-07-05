<template>
  <div class="ColSelected">
    <input
      v-model="courseSelected"
      type="checkbox"
      class="form-check-input cursor-pointer"
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
