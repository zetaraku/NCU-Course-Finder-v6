<template>
  <div class="MySchedule container my-4">
    <MyScheduleHeader />
    <MyScheduleGrid />
  </div>
</template>

<script>
import MyScheduleHeader from './MyScheduleHeader.vue';
import MyScheduleGrid from './MyScheduleGrid.vue';

export default {
  components: {
    MyScheduleHeader,
    MyScheduleGrid,
  },
};
</script>
