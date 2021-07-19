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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap') print;

@media print {
  @page {
    size: A4 portrait;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  :root {
    --bs-font-sans-serif: 'Noto Sans TC', sans-serif !important;
  }

  html, body {
    height: 100vh;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }

  header {
    display: none !important;
  }
  main {
    padding: 0 !important;
  }
  footer {
    display: none !important;
  }

  .MySchedule {
    max-width: 100% !important;
  }
}
</style>
