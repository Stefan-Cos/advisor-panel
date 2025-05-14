
export const getSampleRationale = (index: number): string | null => {
  if (index < 3) {
    const rationales = [
      "Strategic fit with their healthcare portfolio expansion goals and complementary to their existing solutions.",
      "Direct alignment with their stated acquisition criteria focusing on data analytics and AI-powered healthcare platforms.",
      "Their recent M&A activity suggests they're actively seeking innovative solutions in this specific vertical."
    ];
    return rationales[index];
  }
  return null;
};
