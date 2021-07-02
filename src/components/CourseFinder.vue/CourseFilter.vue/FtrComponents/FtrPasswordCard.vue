<template>
  <div class="FtrPasswordCard">
    <label class="form-label fw-bolder">密碼卡</label>
    <fieldset class="input-group">
      <i class="visually-hidden" />
      <div
        v-for="passwordCard in filterOptions.passwordCards"
        :key="passwordCard.value"
        class="-x-form-check form-check-inline"
      >
        <label class="form-check-label cursor-pointer">
          <input
            v-model="filters.passwordCard"
            :value="passwordCard.value"
            type="radio"
            class="form-check-input cursor-pointer m-1"
          >
          <span
            class="mx-1"
            v-text="passwordCard.text"
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
