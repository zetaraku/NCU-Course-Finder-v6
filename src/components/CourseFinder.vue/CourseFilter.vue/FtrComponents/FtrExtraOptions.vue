<template>
  <div class="FtrExtraOptions">
    <label class="form-label fw-bold">進階選項</label>
    <fieldset
      class="input-group form-control px-1 border-2"
      :class="filters.extraOptions.length > 0 ? 'border-primary' : 'border-white'"
    >
      <i class="visually-hidden" />
      <div
        v-for="extraOption in filterOptions.extraOptions"
        :key="extraOption.value"
        class="-x-form-check form-check-inline me-2"
      >
        <label class="form-check-label cursor-pointer">
          <input
            v-model="filters.extraOptions"
            :value="extraOption.predicate"
            type="checkbox"
            class="form-check-input cursor-pointer m-1"
          >
          <!-- eslint-disable vue/no-v-html -->
          <span
            class="mx-1"
            v-html="extraOption.html"
          />
          <!-- eslint-enable vue/no-v-html -->
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
