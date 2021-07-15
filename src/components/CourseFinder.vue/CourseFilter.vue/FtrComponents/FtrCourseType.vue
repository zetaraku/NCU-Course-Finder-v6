<template>
  <div class="FtrCourseType">
    <label class="form-label fw-bold">選修別</label>
    <fieldset
      class="input-group form-control px-1 border-2"
      :class="filters.courseType !== null ? 'border-primary' : 'border-white'"
    >
      <i class="visually-hidden" />
      <div
        v-for="courseType in filterOptions.courseTypes"
        :key="courseType.value"
        class="-x-form-check form-check-inline"
      >
        <label class="form-check-label cursor-pointer">
          <input
            v-model="filters.courseType"
            :value="courseType.value"
            type="radio"
            class="form-check-input cursor-pointer m-1"
          >
          <span
            class="mx-1"
            v-text="courseType.text"
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
