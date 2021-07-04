<template>
  <div class="FtrClassNo">
    <label class="form-label fw-bold">課號</label>
    <input
      v-model.trim="filters.classNo"
      type="text"
      class="form-control"
      list="datalist_classNos"
      placeholder="請輸入課號"
    >
    <datalist id="datalist_classNos">
      <option
        v-for="(classNo, i) in filterOptions.classNos"
        :key="i"
        :value="classNo"
      />
    </datalist>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
