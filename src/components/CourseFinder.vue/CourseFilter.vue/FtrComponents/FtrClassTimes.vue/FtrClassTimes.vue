<template>
  <div class="FtrClassTimes">
    <label class="form-label fw-bold">上課時段</label>
    <div class="position-relative">
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
        v-if="filters.classTimes.length > 0"
        class="btn-close position-absolute top-50 end-0 translate-middle-y me-2"
        aria-label="重設"
        @click="filters.classTimes = [];"
      />
    </div>
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
