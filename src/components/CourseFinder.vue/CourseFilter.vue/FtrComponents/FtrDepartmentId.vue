<template>
  <div class="FtrDepartmentId">
    <label class="form-label fw-bold">系別</label>
    <select
      v-model="filters.departmentId"
      class="form-select cursor-pointer border-2"
      :class="{ 'border-primary': filters.departmentId !== null }"
    >
      <option :value="null">
        【不指定】
      </option>
      <option
        v-for="department in filterOptions.departments"
        :key="department.departmentId"
        :value="department.departmentId"
      >
        {{ department.departmentName }}
        ({{ department.classPrefixes.length > 0 ? department.classPrefixes.join('/') : '無資料' }})
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
