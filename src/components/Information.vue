<template>
  <div class="Information container my-4">
    <div class="mb-4">
      <h1 class="text-center">
        選課相關說明
      </h1>
    </div>
    <div class="my-4">
      <div class="list-group">
        <a
          v-for="(link, i) in links"
          :key="i"
          class="list-group-item list-group-item-action link-primary text-truncate"
          :href="link.url"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import links from '@/assets/info-links.json';

export default {
  setup() {
    return {
      links,
    };
  },
};
</script>

<style lang="scss" scoped>
.Information {
  max-width: 540px;
}
</style>
