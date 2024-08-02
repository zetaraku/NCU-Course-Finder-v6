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
    const keywords = filters.title.toLowerCase().split(/\s+/);
    results = results.filter(
      course => keywords.some(
        keyword => course.title.toLowerCase().includes(keyword),
      ),
    );
  }
  if (filters.teachers !== '') {
    const keywords = filters.teachers.toLowerCase().split(/\s+/);
    results = results.filter(
      course => course.teachers.some(
        teacher => keywords.some(
          keyword => teacher.toLowerCase().includes(keyword),
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

  if (sorting.column !== null) {
    let { key, sortType } = sorting.column;
    if (sortType === 'truthy') {
      result.sort((a, b) => Boolean(a[key]) - Boolean(b[key]));
    } else if (sortType === 'number') {
      result.sort((a, b) => Number(a[key]) - Number(b[key]));
    } else if (sortType === 'string') {
      result.sort((a, b) => String(a[key] ?? '').localeCompare(String(b[key] ?? '')));
    } else if (sortType === 'length') {
      result.sort((a, b) => a[key].length - b[key].length);
    } else {
      throw new Error(`Unknown sorting type: '${sortType}'`);
    }
  }

  if (sorting.order === 'desc') {
    result.reverse();
  }

  return result;
}
