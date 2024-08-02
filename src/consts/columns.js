/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
// eslint-disable-next-line import/prefer-default-export
export const COLUMNS = [
  { name: '選修別', abbrName: '', key: 'courseType', sortType: 'string', description: '選修別' },
  { name: '課號', key: 'classNo', sortType: 'string' },
  { name: '課程名稱', key: 'title', sortType: 'length' },
  { name: '授課教師', key: 'teachers', sortType: 'length' },
  { name: '學分數', abbrName: '學分', key: 'credit', sortType: 'number' },
  {
    name: '中選率', key: 'successRate', sortType: 'number', description: [
      '中選率＝剩餘名額／(待分發人數+1)',
      '※請注意：此中選率為估計數字，並沒有將志願序納入計算',
    ].join('<br>'),
  },
  { name: '飽和度', key: 'fullRate', sortType: 'number', description: '飽和度＝中選人數／人數限制' },
  { name: '上課時段/教室', key: 'classTimes', sortType: 'length' },
  { name: '是否選擇', abbrName: '', key: 'selected', sortType: 'truthy', description: '※勾選以將此課程加到【我的課表】' },
];
