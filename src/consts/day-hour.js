/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */

export const DAYS = [
  { key: '0', name: '日', isWeekend: true },
  { key: '1', name: '一' },
  { key: '2', name: '二' },
  { key: '3', name: '三' },
  { key: '4', name: '四' },
  { key: '5', name: '五' },
  { key: '6', name: '六', isWeekend: true },
];

export const HOURS = [
  { key: '1', name: '1', timeInfo: '08:00~08:50' },
  { key: '2', name: '2', timeInfo: '09:00~09:50' },
  { key: '3', name: '3', timeInfo: '10:00~10:50' },
  { key: '4', name: '4', timeInfo: '11:00~11:50' },
  { key: 'Z', name: 'Z', timeInfo: '12:00~12:50', backgroundColor: 'Gold' },
  { key: '5', name: '5', timeInfo: '13:00~13:50' },
  { key: '6', name: '6', timeInfo: '14:00~14:50' },
  { key: '7', name: '7', timeInfo: '15:00~15:50' },
  { key: '8', name: '8', timeInfo: '16:00~16:50' },
  { key: '9', name: '9', timeInfo: '17:00~17:50', hideInPrint: true },
  { key: 'A', name: 'A', timeInfo: '18:00~18:50', backgroundColor: 'LightSkyBlue', hideInPrint: true },
  { key: 'B', name: 'B', timeInfo: '19:00~19:50', backgroundColor: 'LightSkyBlue', hideInPrint: true },
  { key: 'C', name: 'C', timeInfo: '20:00~20:50', backgroundColor: 'LightSkyBlue', hideInPrint: true },
  { key: 'D', name: 'D', timeInfo: '21:00~21:50', backgroundColor: 'LightSkyBlue', hideInPrint: true },
];

export const DAY_HOURS = DAYS.flatMap(
  (day, i) => HOURS.map(
    (hour, j) => ({
      i, j,
      day, hour,
      key: `${day.key}-${hour.key}`,
    }),
  ),
);
