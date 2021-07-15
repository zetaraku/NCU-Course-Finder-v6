<template>
  <div class="FtrClassPrefix">
    <label class="form-label fw-bold">常用類別</label>
    <select
      v-model="filters.classPrefix"
      class="form-select cursor-pointer border-2"
      :class="{ 'border-primary': filters.classPrefix !== null }"
    >
      <option :value="null">
        【選擇常用類別】
      </option>
      <option
        v-for="classPrefix in filterOptions.classPrefixes"
        :key="classPrefix.value"
        :value="classPrefix.value"
      >
        {{ classPrefix.text }} ({{ classPrefix.value ?? "無代號" }})
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
