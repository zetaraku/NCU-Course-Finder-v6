<template>
  <ErrorPage title="418">
    <template #message>
      The server refuses to brew coffee because it is, permanently, a <em>teapot</em>.
    </template>
    <template #action>
      <a
        class="btn btn-outline-secondary"
        href="https://paypal.me/zetaraku"
      >
        Maybe you can buy me a coffee instead!
        <i class="bi bi-cup ms-1" />
      </a>
    </template>
    <template #extras>
      <ul class="mt-5">
        <!-- List of Sponsors -->
      </ul>
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
