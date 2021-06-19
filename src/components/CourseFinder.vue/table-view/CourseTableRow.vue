<template>
  <tr class="CourseTableRow">
    <td
      v-for="column in columns"
      :key="column.key"
    >
      {{ course[column.key] }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>
