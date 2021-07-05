<template>
  <div class="CourseGrid">
    <CourseGridHeader class="mb-4" />
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div
        v-for="course in courses"
        :key="course.serialNo"
        class="col"
      >
        <CourseGridTile
          :course="course"
          class="h-100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseGridHeader from './CourseGridHeader.vue';
import CourseGridTile from './CourseGridTile.vue';

export default {
  components: {
    CourseGridHeader,
    CourseGridTile,
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
};
</script>
