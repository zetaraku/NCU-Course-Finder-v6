<template>
  <div class="FtrClassNo">
    <label class="form-label fw-bold">課號</label>
    <div class="position-relative">
      <input
        v-model.trim="filters.classNo"
        type="text"
        class="form-control border-2"
        :class="{ 'border-primary': filters.classNo !== '' }"
        list="datalist_classNos"
        placeholder="請輸入課號"
      >
      <button
        v-if="filters.classNo !== ''"
        class="btn-close position-absolute top-50 end-0 translate-middle-y me-2"
        aria-label="重設"
        @click="filters.classNo = '';"
      />
    </div>
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
