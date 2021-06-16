<template>
  <nav class="Pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button
          class="page-link"
          aria-label="上一頁"
          @click="$emit('update:currentPage', Math.max(1, currentPage - 1));"
        >
          <i class="bi bi-chevron-left" />
        </button>
      </li>

      <li
        v-for="(page, i) in computePaginationItems(pageCount, 1, currentPage)"
        :key="i"
        class="page-item"
        :class="{ 'active': page === currentPage, 'disabled': page === null }"
      >
        <button
          class="page-link px-0"
          @click="$emit('update:currentPage', page);"
        >
          {{ page ?? '...' }}
        </button>
      </li>

      <li class="page-item">
        <button
          class="page-link"
          aria-label="下一頁"
          @click="$emit('update:currentPage', Math.min(currentPage + 1, pageCount));"
        >
          <i class="bi bi-chevron-right" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computePaginationItems } from '@/helpers';

export default {
  props: {
    pageCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: [
    'update:currentPage',
  ],
  setup() {
    return {
      computePaginationItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-link {
  width: 42px;
}
</style>
