<template>
  <div class="ErrorPage container flex-column flex-centered vh-100 pt-5">
    <div class="flex-centered py-4">
      <h1 class="d-inline-block border-end m-0 px-3">
        {{ title }}
      </h1>
      <p class="d-inline-block lead m-0 px-3">
        <slot name="message" />
      </p>
    </div>
    <div class="flex-centered">
      <slot name="action">
        <router-link
          class="btn btn-outline-secondary"
          to="/"
        >
          回首頁
        </router-link>
      </slot>
    </div>
    <div>
      <slot name="extras" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      ...props,
    };
  },
};
</script>

<style lang="scss" scoped>
.ErrorPage {
  margin-top: -70px;
}
</style>
