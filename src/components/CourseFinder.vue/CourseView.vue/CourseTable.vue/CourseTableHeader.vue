<template>
  <tr class="CourseTableHeader fs-5 user-select-none">
    <th
      v-for="column in columns"
      :key="column.key"
    >
      <label
        v-tooltip="{ content: column.description, html: true }"
        class="text-nowrap cursor-pointer"
        :class="column.key === sorting.column?.key ? 'fw-bold' : 'fw-normal'"
        @click="toggleSorting(column);"
      >
        <i
          v-if="column.description !== undefined"
          class="bi bi-info-circle fs-6"
        />
        {{ column.abbrName ?? column.name }}
        <i
          class="bi ms-1"
          :class="
            column.key !== sorting.column?.key ? 'bi-chevron-expand' :
            sorting.order === 'asc' ? 'bi-chevron-up' : 'bi-chevron-down'
          "
        />
      </label>
    </th>
  </tr>
</template>

<script>
import * as Vue from 'vue';
import { COLUMNS as columns } from '@/consts';

export default {
  setup() {
    const sorting = Vue.inject('sorting');

    return {
      columns,
      sorting,

      toggleSorting(column) {
        if (column.key !== sorting.value.column?.key) {
          sorting.value.column = column;
        } else {
          sorting.value.order = sorting.value.order === 'asc' ? 'desc' : 'asc';
        }
      },
    };
  },
};
</script>
