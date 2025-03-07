import { formatDate } from "./formatDate";

export function getDefaultDateRange(daysBack: number) {
  const today = new Date();
  const endDate = formatDate(today);

  const startDateObj = new Date();
  startDateObj.setDate(today.getDate() - daysBack + 1);
  const startDate = formatDate(startDateObj);

  return { startDate, endDate };
}

export const getNextDateRange = (lastDate: string, daysBack: number) => {
  const endDateObj = new Date(lastDate);
  endDateObj.setDate(endDateObj.getDate() - 1);

  const startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() - daysBack + 1);

  const endDate = formatDate(endDateObj);
  const startDate = formatDate(startDateObj);

  return { startDate, endDate };
};
