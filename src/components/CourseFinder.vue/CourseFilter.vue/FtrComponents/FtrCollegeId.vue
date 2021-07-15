<template>
  <div class="FtrCollegeId">
    <label class="form-label fw-bold">學院</label>
    <select
      v-model="filters.collegeId"
      class="form-select cursor-pointer border-2"
      :class="{ 'border-primary': filters.collegeId !== null }"
    >
      <option :value="null">
        【不指定／常用類別】
      </option>
      <option
        v-for="college in filterOptions.colleges"
        :key="college.collegeId"
        :value="college.collegeId"
      >
        {{ college.collegeName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
