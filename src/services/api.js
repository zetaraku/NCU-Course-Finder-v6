import { DAY_HOURS } from '@/consts';

function makePlaceholders(dayHours) {
  return dayHours.map(
    ({ i, j, key }) => ({
      serialNo: -(10000 + 100 * i + 1 * j),
      classNo: `ZZ000${key.replace('-', '')}`,
      title: '【預留時段】',
      credit: 0,
      passwordCard: null,
      teachers: [],
      classTimes: [key],
      limitCnt: null,
      admitCnt: 0,
      waitCnt: 0,
      collegeIds: [],
      departmentIds: [],
      classRooms: [],
      isPlaceholder: true,
    }),
  );
}

function preprocessCourses(courses) {
  // add class time placeholders for MySchedule
  courses.push(...makePlaceholders(DAY_HOURS));

  for (let course of courses) {
    course.classNo = `${course.classNo.slice(0, 6)}-${course.classNo.slice(6)}`;
    course.limitCnt = course.limitCnt ?? Infinity;
    course.remainCnt = course.limitCnt - course.admitCnt;
    course.successRate = (100 * course.remainCnt) / (course.waitCnt + 1);
    course.fullRate = (100 * course.admitCnt) / course.limitCnt;
  }
}

function computeClassPrefixesMapping(courses) {
  let classPrefixesMapping = new Map();

  for (let course of courses) {
    for (let departmentId of course.departmentIds) {
      let classPrefix = course.classNo.slice(0, 2);

      let classPrefixes = classPrefixesMapping.get(departmentId) ?? new Set();
      classPrefixes.add(classPrefix);

      classPrefixesMapping.set(departmentId, classPrefixes);
    }
  }

  return classPrefixesMapping;
}

function preprocessDepartments(departments, { courses }) {
  let classPrefixesMapping = computeClassPrefixesMapping(courses);

  for (let department of departments) {
    /* eslint-disable no-param-reassign */
    department.classPrefixes = Array.from(classPrefixesMapping.get(department.departmentId) ?? new Set());
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
