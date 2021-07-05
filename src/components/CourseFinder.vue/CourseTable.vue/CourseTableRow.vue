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
import { columns } from './ColComponents/data';

export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>
