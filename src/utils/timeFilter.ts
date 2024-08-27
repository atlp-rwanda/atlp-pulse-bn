export function timeFilterMiddleware(req: { query: { timeRange: any; }; }) {
  const timeRange = req.query.timeRange;
  
  if (timeRange) {
    const currentDate = new Date();
    let startDate;
  
    switch (timeRange) {
    case '7days':
      startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '1month':
      startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      break;
    case '3months':
      startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
      break;
    case '1year':
      startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
      break;
    default:
      startDate = new Date(0);
    }
  
    return {
      timeFilter: {
        createdAt: { $gte: startDate },
      },
    };
  } else {
    return {};
  }
}