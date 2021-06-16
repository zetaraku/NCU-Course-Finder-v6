<template>
  <tr class="CourseTableHeader fs-5">
    <th
      v-for="column in columns"
      :key="column.key"
    >
      <label class="text-nowrap cursor-pointer">
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
