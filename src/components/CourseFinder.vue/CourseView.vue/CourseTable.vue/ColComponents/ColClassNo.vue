<template>
  <div class="ColClassNo text-nowrap">
    <abbr
      v-tooltip="{ content: [
        `流水號：${describeSerialNo(course)}`,
        `開課單位：${describeDepartments(course)}`,
        `授課對象：${describeTarget(course)}`,
      ].join('<br>'), html: true }"
      class="font-monospace cursor-help"
      title=""
    >
      {{ course.classNo }}
    </abbr>
  </div>
</template>

<script>
import * as Vuex from 'vuex';

const courseTargetMapping = {
  0: '不分類',
  1: '一年級',
  2: '二年級',
  3: '三年級',
  4: '四年級',
  5: '研究所碩、博士',
  6: '研究所碩、博士',
  7: '研究所碩、博士',
  8: '研究所碩、博士',
  A: '碩士在職專班',
  Z: '產業碩士專班',
};

export default {
  inject: ['course'],
  setup() {
    const store = Vuex.useStore();

    return {
      describeSerialNo(course) {
        return String(course.serialNo).padStart(5, '0');
      },
      describeDepartments(course) {
        return course.departmentIds.map(
          departmentId => store.state.departments.find(
            department => department.departmentId === departmentId,
          )?.departmentName ?? 'N/A',
        ).join('、') || '【無】';
      },
      describeTarget(course) {
        return courseTargetMapping[course.classNo.charAt(2)] ?? 'N/A';
      },
    };
  },
};
</script>
