<template>
  <div class="FilteringControls d-flex justify-content-center">
    <div class="d-flex flex-column align-items-center mx-2 mx-sm-3">
      <button
        class="btn btn-lg btn-secondary text-nowrap px-sm-4"
        @click="$emit('reset-filters');"
      >
        重置篩選條件
      </button>
    </div>
    <div class="d-flex flex-column align-items-center mx-2 mx-sm-3">
      <button
        class="btn btn-lg btn-primary text-nowrap px-sm-4"
        :disabled="autoFilteringEnabled"
        @click="$emit('refresh-filtered-courses');"
      >
        開始多重篩選
      </button>
      <label
        v-tooltip.bottom="'※如果在變更篩選條件時延遲過久，可試著取消勾選此選項並改為手動套用'"
        class="form-check-label text-nowrap user-select-none cursor-pointer mt-3"
      >
        <input
          v-model="autoFilteringEnabled"
          type="checkbox"
          class="form-check-input cursor-pointer m-1"
        >
        自動套用
        <i class="bi bi-info-circle ms-1" />
      </label>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';

export default {
  emits: [
    'reset-filters',
    'refresh-filtered-courses',
  ],
  setup() {
    const autoFilteringEnabled = Vue.inject('autoFilteringEnabled');

    return {
      autoFilteringEnabled,
    };
  },
};
</script>
