import * as Vue from 'vue';

export function makeFilters() {
  return Vue.reactive({
    collegeId: null,
    departmentId: null,
    classPrefix: null,
    title: '',
    teachers: '',
    classNo: '',
    classTimes: [],
    credits: [],
    courseType: null,
    passwordCard: null,
    extraOptions: [],
  });
}

// eslint-disable-next-line object-curly-newline
export function makeFilterOptions({ colleges, departments, courses, selectedClassTimes, filters }) {
  return Vue.reactive({
    colleges,
    departments: Vue.computed(
      () => Vue.unref(departments).filter(
        department => department.collegeId === Vue.unref(filters).collegeId,
      ),
    ),
    classPrefixes: import.meta.env.VITE_NO_CLASS_PREFIX ? [] : [
      { value: 'CC', text: '◆ 通識課程 - 核心必修' },
      { value: 'CC01', text: '◇ 核心必修 - 人文與思想' },
      { value: 'CC02', text: '◇ 核心必修 - 自然科學' },
      { value: 'CC03', text: '◇ 核心必修 - 應用科學' },
      { value: 'CC04', text: '◇ 核心必修 - 社會思潮與現象' },
      { value: 'GS', text: '◆ 通識課程 - 通識選修' },
      { value: 'MN', text: '◆ 通識課程 - 國防通識' },
      { value: 'CL0', text: '◆ 共同必修 - 大一國文' },
      { value: 'LN1', text: '◆ 共同必修 - 大一英文' },
      { value: 'HI0', text: '◆ 共同必修 - 大二歷史' },
      { value: 'PE', text: '◆ 共同必修 - 體育課程' },
      { value: 'SC', text: '◆ 共同必修 - 服務學習' },
      { value: 'ZZ', text: '◆ 我的課表 - 課表預留時段' },
    ],
    titles: Vue.computed(
      () => [...new Set(Vue.unref(courses).map(course => course.title))],
    ),
    teachers: Vue.computed(
      () => [...new Set(Vue.unref(courses).flatMap(course => course.teachers))],
    ),
    classNos: Vue.computed(
      () => [...new Set(Vue.unref(courses).map(course => course.classNo.split('-')[0]))],
    ),
    classTimes: /* unused */ [],
    credits: Vue.computed(
      () => [...new Set(Vue.unref(courses).map(course => course.credit))].toSorted((a, b) => a - b),
    ),
    courseTypes: [
      { value: null, text: '【不篩選】' },
      { value: 'ELECTIVE', text: '選修' },
      { value: 'REQUIRED', text: '必修' },
    ],
    passwordCards: [
      { value: null, text: '【不篩選】' },
      { value: 'NONE', text: '不使用' },
      { value: 'OPTIONAL', text: '部分使用' },
      { value: 'ALL', text: '全部使用' },
    ],
    extraOptions: [
      {
        value: 'excludeFull',
        html: '排除<b>已額滿</b>的課程',
        predicate: course => !(course.admitCnt >= course.limitCnt),
      },
      {
        value: 'excludeInfinity',
        html: '排除<b>無名額限制</b>的課程',
        predicate: course => !(course.limitCnt === Infinity),
      },
      {
        value: 'excludeMySchedule',
        html: '排除<b>與我的課表衝堂</b>的課程',
        predicate: course => course.selected || !course.classTimes.some(
          classTime => Vue.unref(selectedClassTimes).has(classTime),
        ),
      },
      {
        value: 'excludeNonMySchedule',
        html: '排除<b>不在我的課表裡</b>的課程',
        predicate: course => !(course.selected !== true),
      },
    ],
  });
}
