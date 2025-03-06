export function getDateRange(daysBack: number) {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];

  const startDateObj = new Date();
  startDateObj.setDate(today.getDate() - daysBack);
  const startDate = startDateObj.toISOString().split("T")[0];

  return { startDate, endDate };
}
