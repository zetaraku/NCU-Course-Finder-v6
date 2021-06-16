function preprocessCourses(courses) {
  for (let course of courses) {
    /* eslint-disable no-param-reassign */
    course.classNo = `${course.classNo.slice(0, 6)}-${course.classNo.slice(6)}`;
    course.limitCnt = course.limitCnt ?? Infinity;
    course.remainCnt = course.limitCnt - course.admitCnt;
    course.successRate = (100 * course.remainCnt) / (course.waitCnt + 1);
    course.fullRate = (100 * course.admitCnt) / course.limitCnt;
    /* eslint-enable no-param-reassign */
  }
}

function computeClassPrefixMapping(courses) {
  let classPrefixMapping = new Map();

  for (let course of courses) {
    for (let departmentId of course.departmentIds) {
      let classPrefix = course.classNo.slice(0, 2);
      classPrefixMapping.set(departmentId, classPrefix);
    }
  }

  return classPrefixMapping;
}

function preprocessDepartments(departments, { courses }) {
  let classPrefixMapping = computeClassPrefixMapping(courses);

  for (let department of departments) {
    /* eslint-disable no-param-reassign */
    department.classPrefix = classPrefixMapping.get(department.departmentId);
    /* eslint-enable no-param-reassign */
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function fetchCourseData() {
  let response = await fetch(import.meta.env.VITE_COURSE_DATA_URL);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  let {
    colleges,
    departments,
    courses,
    LAST_UPDATE_TIME,
  } = await response.json();

  preprocessCourses(courses);
  preprocessDepartments(departments, { courses });

  return {
    colleges,
    departments,
    courses,
    lastUpdateTime: new Date(LAST_UPDATE_TIME),
  };
}
