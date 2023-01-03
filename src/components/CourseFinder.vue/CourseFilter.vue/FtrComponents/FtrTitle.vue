<template>
  <div class="FtrTitle">
    <label class="form-label fw-bold">
      課程名稱
      <i
        v-tooltip="'※可用空格隔開多個關鍵字'"
        class="bi bi-info-circle ms-1 pe-2 cursor-pointer"
      />
    </label>
    <input
      v-model.trim="filters.title"
      type="text"
      class="form-control border-2"
      :class="{ 'border-primary': filters.title !== '' }"
      list="datalist_titles"
      placeholder="請輸入課程名稱"
    >
    <datalist id="datalist_titles">
      <option
        v-for="(title, i) in filterOptions.titles"
        :key="i"
        :value="title"
      />
    </datalist>
  </div>
</template>

<script>
export default {
  inject: ['filters', 'filterOptions'],
};
</script>
