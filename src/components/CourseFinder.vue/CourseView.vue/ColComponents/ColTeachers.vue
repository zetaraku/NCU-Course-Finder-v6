<template>
  <div class="ColTeachers flex-centered">
    <template v-if="course.teachers.length === 0">
      <span class="text-muted fs-6">
        無
      </span>
    </template>
    <template v-else-if="course.teachers.length === 1">
      <span>
        {{ course.teachers[0] }}
      </span>
    </template>
    <template v-else>
      <abbr
        v-tooltip="{ content: course.teachers.join('<br>'), html: true }"
        title=""
      >
        {{ course.teachers[0] }}
        <small class="text-muted">
          (+{{ course.teachers.length - 1 }})
        </small>
      </abbr>
    </template>
  </div>
</template>

<script>
export default {
  inject: ['course'],
};
</script>
