// eslint-disable-next-line import/prefer-default-export
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
