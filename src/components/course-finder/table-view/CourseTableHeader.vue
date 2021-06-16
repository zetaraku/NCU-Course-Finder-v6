<template>
  <tr class="CourseTableHeader fs-5">
    <th
      v-for="column in columns"
      :key="column.key"
    >
      <label
        v-tooltip="column.description"
        class="text-nowrap cursor-pointer"
      >
        <i
          v-if="column.description !== undefined"
          class="bi bi-info-circle fs-6"
        />
        {{ column.name }}
      </label>
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
    };
  },
};
</script>

<style>

</style>
