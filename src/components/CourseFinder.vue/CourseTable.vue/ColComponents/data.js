/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/prefer-default-export
export const columns = [
  { name: '', key: 'courseType', sortType: 'string', description: '※選修別' },
  { name: '課號', key: 'classNo', sortType: 'string' },
  { name: '課程名稱', key: 'title', sortType: 'length' },
  { name: '授課教師', key: 'teachers', sortType: 'length' },
  { name: '學分', key: 'credit', sortType: 'number' },
  { name: '中選率', key: 'successRate', sortType: 'number', description: '※剩餘名額／(待分發人數+1)＝中選率' },
  { name: '飽和度', key: 'fullRate', sortType: 'number', description: '※中選人數／人數限制＝飽和度' },
  { name: '上課時段', key: 'classTimes', sortType: 'length' },
  { name: '', key: 'selected', sortType: 'truthy', description: '※勾選以將此課程加到【我的課表】' },
];
