<template>
  <div class="ColCourseType">
    <span
      class="badge rounded-pill p-2"
      :class="courseTypeClass(course.courseType)"
    >
      {{ courseTypeAbbr(course.courseType) }}
    </span>
  </div>
</template>

<script>
const courseTypeMapping = {
  ELECTIVE: { text: '選', class: 'bg-success' },
  REQUIRED: { text: '必', class: 'bg-primary' },
};

export default {
  inject: ['course'],
  setup() {
    return {
      courseTypeAbbr(courseType) {
        return courseTypeMapping[courseType]?.text ?? '？';
      },
      courseTypeClass(courseType) {
        return courseTypeMapping[courseType]?.class ?? 'bg-secondary';
      },
    };
  },
};
</script>
