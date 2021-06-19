export function filterCourses(courses, filters) {
  let results = courses.slice();

  if (filters.collegeId !== null) {
    results = results.filter(
      course => course.collegeIds.includes(filters.collegeId),
    );
  }
  if (filters.departmentId !== null) {
    results = results.filter(
      course => course.departmentIds.includes(filters.departmentId),
    );
  }
  if (filters.classPrefix !== null) {
    results = results.filter(
      course => course.classNo.startsWith(filters.classPrefix),
    );
  }
  if (filters.title !== '') {
    const keywords = filters.title.split(/\s+/);
    results = results.filter(
      course => keywords.some(
        keyword => course.title.includes(keyword),
      ),
    );
  }
  if (filters.teachers !== '') {
    const keywords = filters.teachers.split(/\s+/);
    results = results.filter(
      course => course.teachers.some(
        teacher => keywords.some(
          keyword => teacher.includes(keyword),
        ),
      ),
    );
  }
  if (filters.classNo !== '') {
    results = results.filter(
      course => course.classNo.includes(filters.classNo),
    );
  }
  if (filters.classTimes.length > 0) {
    results = results.filter(
      course => course.classTimes.some(
        classTime => filters.classTimes.includes(classTime),
      ),
    );
  }
  if (filters.credits.length > 0) {
    results = results.filter(
      course => filters.credits.includes(course.credit),
    );
  }
  if (filters.courseType !== null) {
    results = results.filter(
      course => course.courseType === filters.courseType,
    );
  }
  if (filters.passwordCard !== null) {
    results = results.filter(
      course => course.passwordCard === filters.passwordCard,
    );
  }
  if (filters.extraOptions.length > 0) {
    results = results.filter(
      course => filters.extraOptions.every(
        predicate => predicate(course) === true,
      ),
    );
  }

  return results;
}

export function sortCourses(courses, sorting) {
  let result = courses.slice();

  if (sorting.key !== '') {
    let { key } = sorting;
    if (sorting.type === 'truthy') {
      result.sort((a, b) => Boolean(a[key]) - Boolean(b[key]));
    } else if (sorting.type === 'number') {
      result.sort((a, b) => a[key] - b[key]);
    } else if (sorting.type === 'string') {
      result.sort((a, b) => a[key].localeCompare(b[key]));
    } else if (sorting.type === 'length') {
      result.sort((a, b) => a[key].length - b[key].length);
    } else {
      throw new Error(`Unknown sorting type: '${sorting.type}'`);
    }
  }

  if (sorting.order === 'desc') {
    result.reverse();
  }

  return result;
}
