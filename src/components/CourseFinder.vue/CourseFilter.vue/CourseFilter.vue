<template>
  <div class="CourseFilter">
    <div class="row row-cols-1 row-cols-md-2 gx-4 gy-3">
      <div class="col">
        <FtrCollegeId />
      </div>
      <div class="col">
        <FtrDepartmentId v-if="filters.collegeId !== null" />
        <FtrClassPrefix v-else />
      </div>
      <div class="col">
        <FtrTitle />
      </div>
      <div class="col">
        <FtrTeachers />
      </div>
      <div class="col">
        <FtrClassNo />
      </div>
      <div class="col">
        <FtrClassTimes />
      </div>
      <div class="col">
        <FtrCourseType />
      </div>
      <div class="col">
        <FtrPasswordCard />
      </div>
      <div class="col">
        <FtrCredits />
      </div>
      <div class="col">
        <FtrExtraOptions />
      </div>
    </div>
  </div>
</template>

<script>
import * as FtrComponents from './Ftr';

export default {
  components: {
    ...FtrComponents,
  },
  inject: ['filters'],
};
</script>
