import { createContext, useEffect, useState } from "react";

import { MockData } from "../data";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sortByDateTime, sortByPrice } from "../utils";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [{ flights: data }] = useState(MockData);
  const [filter, setFilter] = useState({});
  const [selectedFlight, setSelectedFlight] = useState({});
  const [promotion, setPromotion] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  const filterLocalStorage = useLocalStorage("filter", "{}");

  useEffect(() => {
    setFilter(JSON.parse(filterLocalStorage.value));
  }, []);

  const updatePromotion = (payload) => {
    setPromotion(payload);
  };
  const updateSortBy = (payload) => {
    setSortBy(payload);
  };
  const updateSelectedFlight = (payload) => {
    setSelectedFlight(payload);
  };
  const updateFilter = (filter) => {
    setFilter((p) => {
      filterLocalStorage.setValue(JSON.stringify({ ...p, ...filter }));
      return { ...p, ...filter };
    });
  };

  const sortByFlights=(data)=>{
    switch (sortBy) {
      case "arrivalDateTime":
        return sortByDateTime(data)
      default:
        return sortByPrice(data)
    }
  }
  const getFilteredFlightData = () => {
    let filteredData = JSON.parse(JSON.stringify(data));

    if (Object.keys(filter).length) {
      filteredData = filteredData.filter(
        (f) =>
          f?.destinationAirport?.code === filter?.destinationAirport?.value &&
          f?.originAirport?.code === filter?.originAirport?.value
      );

      if (promotion) {
        filteredData.forEach((f) => {
          Object.values(f.fareCategories).forEach((fare) => {
            fare.subcategories.forEach((category) => {
              category.price.amount =
                category.brandCode === "ecoFly"
                  ? parseFloat(parseFloat(category.price.amount) * 0.5, 3)
                  : category.price.amount;
            });
          });
        });
      }
    }

    return sortByFlights(filteredData);
  };

  const sumTotal = () => {
    return selectedFlight?.price?.amount * filter?.passengerCount;
  };

  return (
    <Context.Provider
      value={{
        data,
        filter,
        updateFilter,
        getFilteredFlightData,
        sumTotal,
        updatePromotion,
        promotion,
        updateSortBy,
        selectedFlight,
        updateSelectedFlight,
      }}
    >
      {children}
    </Context.Provider>
  );
};
