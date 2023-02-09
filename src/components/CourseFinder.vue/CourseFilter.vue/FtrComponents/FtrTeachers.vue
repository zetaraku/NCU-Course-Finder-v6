<template>
  <div class="FtrTeachers">
    <label class="form-label fw-bold">
      授課教師
      <i
        v-tooltip="'※可用空格隔開多個關鍵字'"
        class="bi bi-info-circle ms-1 pe-2 cursor-pointer"
      />
    </label>
    <div class="position-relative">
      <input
        v-model.trim="filters.teachers"
        type="text"
        class="form-control border-2"
        :class="{ 'border-primary': filters.teachers !== '' }"
        list="datalist_teachers"
        placeholder="請輸入授課教師名稱"
      >
      <button
        v-if="filters.teachers !== ''"
        class="btn-close position-absolute top-50 end-0 translate-middle-y me-2"
        aria-label="重設"
        @click="filters.teachers = '';"
      />
    </div>
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
