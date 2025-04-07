// Format date to be more readable
export const formatDate = (dateString: string, showDayOfWeek = false) => {
  const date = new Date(dateString);

  // Get month name
  const month = date.toLocaleString('en-US', { month: 'long' });

  // Get day with ordinal suffix
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  // Add day of week if requested
  if (showDayOfWeek) {
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    return `${dayOfWeek}, ${month} ${day}${suffix}`;
  }

  return `${month} ${day}${suffix}`;
};

export const formatTime = (startDateString: string, endDateString: string) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Get time in 12-hour format
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const startTime = startDate
    .toLocaleString('en-US', timeOptions)
    .toLowerCase();
  const endTime = endDate.toLocaleString('en-US', timeOptions).toLowerCase();

  return `${startTime} - ${endTime}`;
};

// Helper function to get day suffix (st, nd, rd, th)
export const getDaySuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
