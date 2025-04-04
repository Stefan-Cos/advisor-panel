
export const formatReportDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};
