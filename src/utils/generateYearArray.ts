import { STARTED_YEAR } from './constants';

export const currentYear = new Date().getFullYear();

function generateYearArray(startYear: number = STARTED_YEAR): number[] {
  const years: number[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

export const yearsList = generateYearArray(STARTED_YEAR).reverse();
