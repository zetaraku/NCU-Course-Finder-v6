<template>
  <div class="ColTitle flex-centered">
    <span
      v-tooltip="course.title"
      class="d-inline-block mw-100 text-truncate"
    >
      <a :href="getCourseDetailUrl(course)">
        {{ course.title }}
      </a>
    </span>
  </div>
</template>

<script>
const COURSE_DETAIL_URL = 'https://cis.ncu.edu.tw/Course/main/support/courseDetail.html';

export default {
  inject: ['course'],
  setup() {
    return {
      getCourseDetailUrl(course) {
        if (course.isPlaceholder) return null;
        return `${COURSE_DETAIL_URL}?crs=${course.serialNo}`;
      },
    };
  },
};
</script>
