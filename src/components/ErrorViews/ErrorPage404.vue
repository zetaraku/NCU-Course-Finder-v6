<template>
  <ErrorPage title="404">
    <template #message>
      The page <samp>{{ $route.path }}</samp> you requested was not found.
    </template>
  </ErrorPage>
</template>

<script>
import ErrorPage from './ErrorPage.vue';

export default {
  components: {
    ErrorPage,
  },
};
</script>
