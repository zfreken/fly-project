export const sortByDateTime = (data) => {
  return data.sort(
    (a, b) =>
    {
      const timeA = parseInt(a.arrivalDateTimeDisplay.split(":")[0]) * 60 + parseInt(a.arrivalDateTimeDisplay.split(":")[1]);
      const timeB = parseInt(b.arrivalDateTimeDisplay.split(":")[0]) * 60 + parseInt(b.arrivalDateTimeDisplay.split(":")[1]);
      return timeA-timeB;
    }
  );
};

export const sortByPrice = (data) => {
  return data.sort((a, b) => {
    const aPrice = a.fareCategories.ECONOMY.subcategories.reduce((min, sub) => sub.price.amount < min ? sub.price.amount : min, Infinity);
    const bPrice = b.fareCategories.ECONOMY.subcategories.reduce((min, sub) => sub.price.amount < min ? sub.price.amount : min, Infinity);
  
    if (aPrice < bPrice) {
      return -1;
    } else if (aPrice > bPrice) {
      return 1;
    } else {
      return 0;
    }
  });;
};
