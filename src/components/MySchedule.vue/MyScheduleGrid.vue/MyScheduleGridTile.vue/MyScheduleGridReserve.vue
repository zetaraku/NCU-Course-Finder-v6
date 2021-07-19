<template>
  <div
    class="MyScheduleGridReserve flex-column flex-centered py-1"
    :class="{ 'd-print-none': true }"
  >
    <button
      v-tooltip.bottom="'預留本時段'"
      class="btn btn-outline-secondary"
      @click="addPlaceholder"
    >
      <i class="bi bi-slash" />
    </button>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';

export default {
  props: {
    dayHour: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = Vuex.useStore();

    const targetPlaceholder = Vue.computed(() => store.getters.placeholderCourses.find(
      course => course.classTimes.includes(props.dayHour.key),
    ));

    return {
      addPlaceholder() {
        if (targetPlaceholder.value === undefined) return;
        targetPlaceholder.value.selected = true;
      },
    };
  },
};
</script>
