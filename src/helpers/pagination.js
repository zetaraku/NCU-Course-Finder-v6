import { clamp } from './math';

export function computePaginationItems(pageCount, displayRange, currentPage = 1) {
  let firstPage = 1;
  let lastPage = Math.max(1, pageCount);

  let centerPage = clamp(currentPage, firstPage + 2 + displayRange, lastPage - 2 - displayRange);
  let fromRange = Math.max(centerPage - displayRange, firstPage + 2);
  let toRange = Math.min(centerPage + displayRange, lastPage - 2);

  let items = [];

  if (pageCount >= 1) items.push(firstPage);
  if (pageCount >= 3) items.push(fromRange <= firstPage + 2 ? firstPage + 1 : null);
  for (let i = fromRange; i <= toRange; i += 1) items.push(i);
  if (pageCount >= 4) items.push(toRange >= lastPage - 2 ? lastPage - 1 : null);
  if (pageCount >= 2) items.push(lastPage);

  return items;
}

export function paginate(items, pageSize, currentPage = 1) {
  return items.slice(
    pageSize * (currentPage - 1),
    pageSize * (currentPage),
  );
}

export function paginateIndex(itemsLength, pageSize, currentPage = 1) {
  let offset = pageSize * (currentPage - 1);
  let length = Math.min(pageSize, itemsLength - offset);

  return [...Array(length).keys()].map(n => n + offset);
}
