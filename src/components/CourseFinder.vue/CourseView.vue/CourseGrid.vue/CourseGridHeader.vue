<template>
  <div class="CourseGridHeader row align-items-center">
    <div class="col col-auto">
      <label class="fw-bold">
        排序依據
      </label>
    </div>
    <div class="col">
      <select
        v-model="sorting.column"
        class="form-select"
      >
        <option :value="null">
          【預設排序】
        </option>
        <option
          v-for="column in columns"
          :key="column.key"
          :value="column"
        >
          {{ column.name }}
        </option>
      </select>
    </div>
    <div class="col col-auto">
      <button
        class="btn btn-light border border-2"
        @click="toggleSortingOrder"
      >
        <template v-if="sorting.order === 'asc'">
          <i class="bi bi-sort-up-alt me-1" />
          升序
        </template>
        <template v-else>
          <i class="bi bi-sort-down me-1" />
          降序
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import { columns } from '../ColComponents/data';

export default {
  setup() {
    const sorting = Vue.inject('sorting');

    return {
      columns,
      sorting,

      toggleSortingOrder() {
        sorting.value.order = sorting.value.order === 'asc' ? 'desc' : 'asc';
      },
    };
  },
};
</script>
