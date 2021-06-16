// eslint-disable-next-line import/prefer-default-export
export const columns = [
  { name: '課號', key: 'classNo' },
  { name: '課程名稱', key: 'title' },
  { name: '授課教師', key: 'teachers' },
  { name: '學分', key: 'credit' },
  { name: '中選率', key: 'successRate', description: '※剩餘名額／(待分發人數+1)＝中選率' },
  { name: '飽和度', key: 'fullRate', description: '※中選人數／人數限制＝飽和度' },
  { name: '上課時段', key: 'classTimes' },
];
