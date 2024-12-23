function formatTransactionItemDate(dateStr: string): string {
  const parsedDate = new Date(dateStr);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date string');
  }

  const now = new Date();
  const oneWeekAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
  );

  if (parsedDate >= oneWeekAgo && parsedDate <= now) {
    // Get the day name (e.g., "Monday")
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return dayNames[parsedDate.getDay()];
  } else {
    // Format as MM/DD/YYYY
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${month}/${day}/${year}`;
  }
}

export { formatTransactionItemDate };
