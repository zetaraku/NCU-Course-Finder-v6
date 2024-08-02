<template>
  <div class="ColClassRoom flex-centered">
    <div class="d-flex flex-wrap justify-content-center">
      <span
        v-for="classRoom in (course.classRooms ?? [])"
        :key="classRoom"
        class="badge bg-info font-monospace m-1"
      >
        {{ classRoom }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['course'],
};
</script>
