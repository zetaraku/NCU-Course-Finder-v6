<template>
  <template v-if="$store.state.loadingState !== 'loaded'">
    <LoadingView />
  </template>
  <template v-else>
    <div class="MySchedule container my-4">
      <MyScheduleHeader />
      <MyScheduleGrid />
    </div>
  </template>
</template>

<script>
import LoadingView from '@/components/LoadingView.vue';
import MyScheduleHeader from './MyScheduleHeader.vue';
import MyScheduleGrid from './MyScheduleGrid.vue';

export default {
  components: {
    LoadingView,
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
    margin: 0 !important;
    padding: 0 !important;
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

    .ColTitle a {
      color: var(--bs-dark) !important;
    }
  }
}
</style>
