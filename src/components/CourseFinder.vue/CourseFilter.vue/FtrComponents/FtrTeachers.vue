<template>
  <div class="FtrTeachers">
    <label
      v-tooltip.right="'※可用空格隔開多個關鍵字'"
      class="form-label fw-bold cursor-pointer"
    >
      授課教師<i class="bi bi-info-circle ms-1 pe-2" />
    </label>
    <input
      v-model.trim="filters.teachers"
      type="text"
      class="form-control"
      list="datalist_teachers"
      placeholder="請輸入授課教師名稱"
    >
    <datalist id="datalist_teachers">
      <option
        v-for="(teacher, i) in filterOptions.teachers"
        :key="i"
        :value="teacher"
      />
    </datalist>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
