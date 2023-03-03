export const sortByDateTime = (data) => {
  return data.sort(
    (a, b) => a.arrivalDateTimeDisplay - b.arrivalDateTimeDisplay
  );
};
