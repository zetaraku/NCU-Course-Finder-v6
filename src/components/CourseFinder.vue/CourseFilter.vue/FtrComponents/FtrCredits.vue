<template>
  <div class="FtrCredits">
    <label class="form-label fw-bold">學分數</label>
    <fieldset
      class="input-group form-control px-1 border-2"
      :class="filters.credits.length > 0 ? 'border-primary' : 'border-white'"
    >
      <i class="visually-hidden" />
      <div
        v-for="credit in filterOptions.credits"
        :key="credit"
        class="-x-form-check form-check-inline"
      >
        <label class="form-check-label cursor-pointer">
          <input
            v-model="filters.credits"
            :value="credit"
            type="checkbox"
            class="form-check-input cursor-pointer m-1"
          >
          <span
            class="mx-1"
            v-text="credit"
          />
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
