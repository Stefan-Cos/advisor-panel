
export const getMATrackRecordColor = (record: string) => {
  switch(record) {
    case 'High':
      return 'bg-green-50 text-green-700';
    case 'Medium':
      return 'bg-yellow-50 text-yellow-700';
    case 'Low':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};
