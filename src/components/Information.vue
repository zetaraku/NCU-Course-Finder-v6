<template>
  <div class="Information container my-4">
    <div class="mb-4">
      <h1 class="text-center">
        選課相關說明
      </h1>
    </div>
    <div class="my-4">
      <div class="list-group">
        <a
          v-for="(link, i) in links"
          :key="i"
          class="list-group-item list-group-item-action link-primary text-truncate"
          :href="link.url ?? `${INFORMATION_URL_PREFIX}/${link.fileName}`"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const INFORMATION_URL_PREFIX = 'http://pdc.adm.ncu.edu.tw/Course/course';

const links = [
  { url: 'https://cis.ncu.edu.tw/Course/main', title: '🎯 國立中央大學選課系統' },
  { fileName: 'COUR_S.pdf', title: '📅 選課時程' },
  { fileName: 'COUR_D.pdf', title: '📝 選課程序相關說明' },
  { fileName: 'COUR_R.pdf', title: '📃 國立中央大學學生選課辦法' },
  { fileName: 'COUR_U.pdf', title: '📝 課程時間表使用說明' },
  { fileName: 'COUR_09.pdf', title: '📘 「通識課程」選課說明' },
  { fileName: 'COUR_01.pdf', title: '📘 「體育課程」選課說明' },
  { fileName: 'COUR_11.pdf', title: '📘 「大一國文」選課說明' },
  { fileName: 'COUR_00.pdf', title: '📘 「大一英文」與「進修英文」選課說明' },
  { fileName: 'COUR_15.pdf', title: '📘 「大二歷史」選課說明' },
  { fileName: 'COUR_08.pdf', title: '📘 「服務學習」選課說明' },
  { fileName: 'COUR_21.pdf', title: '📘 「微積分」選課說明' },
  { fileName: 'COUR_22.pdf', title: '📘 「普通物理」選課說明' },
  { fileName: 'COUR_06.pdf', title: '📘 「教育學程」選課說明' },
  { fileName: 'COUR_05.pdf', title: '📘 「軍訓課程」選課說明' },
  { fileName: 'building.htm', title: '🗺️ 上課教室代碼及大樓名稱對照表(含平面圖)' },
  { fileName: 'ICCS_ncu.pdf', title: '⚙️ 本校學生至他校校際選課程序' },
  { fileName: 'ICCS_other.pdf', title: '⚙️ 他校學生至中大校際選課程序' },
];

export default {
  setup() {
    return {
      INFORMATION_URL_PREFIX,
      links,
    };
  },
};
</script>

<style lang="scss" scoped>
.Information {
  max-width: 540px;
}
</style>
