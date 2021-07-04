<template>
  <tr class="CourseTableHeader fs-5 user-select-none">
    <th
      v-for="column in columns"
      :key="column.key"
    >
      <label
        v-tooltip="column.description"
        class="text-nowrap cursor-pointer"
        :class="column.key === sorting.key ? 'fw-bold' : 'fw-normal'"
        @click="toggleSorting(column);"
      >
        <i
          v-if="column.description !== undefined"
          class="bi bi-info-circle fs-6"
        />
        {{ column.name }}
        <i
          class="bi ms-1"
          :class="
            column.key !== sorting.key ? 'bi-chevron-expand' :
            sorting.order === 'asc' ? 'bi-chevron-up' : 'bi-chevron-down'
          "
        />
      </label>
    </th>
  </tr>
</template>

<script>
import * as Vue from 'vue';

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const sorting = Vue.inject('sorting');

    return {
      sorting,

      toggleSorting(column) {
        sorting.value = {
          key: column.key,
          type: column.sortType,
          order: (
            sorting.value.key === column.key && sorting.value.order === 'asc'
              ? 'desc' : 'asc'
          ),
        };
      },
    };
  },
};
</script>

<style>

</style>
