<template>
  <div class="FtrClassTimes">
    <label class="form-label fw-bold">上課時段</label>
    <fieldset class="input-group">
      <button
        class="form-control text-start text-truncate border-2"
        :class="{
          'text-muted': filters.classTimes.length === 0,
          'border-primary': filters.classTimes.length > 0,
        }"
        data-bs-toggle="modal"
        data-bs-target=".ClassTimeSelector"
      >
        {{ filters.classTimes.length > 0 ? filters.classTimes.join(' / ') : '不指定' }}
      </button>
      <button
        v-tooltip="'重設時段'"
        class="btn btn-outline-secondary px-4"
        @click="filters.classTimes = [];"
      >
        <i class="bi bi-backspace" />
      </button>
    </fieldset>
    <ClassTimeSelector />
  </div>
</template>

<script>
import ClassTimeSelector from './ClassTimeSelector.vue';

export default {
  components: {
    ClassTimeSelector,
  },
  inject: ['filters'],
};
</script>
