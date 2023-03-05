import React, { useContext } from "react";
import { Context } from "../../context";
import { Card } from "../../components";

import "./style.scss";

export const List = () => {
  const {
    getFilteredFlightData,
    filter,
    promotion,
    updatePromotion,
    updateSortBy,
  } = useContext(Context);
  const data = getFilteredFlightData();

  const handleFilter = (param) => {
    updateSortBy(param);
  };

  
  return (
    <div className="container py-5">
      <div className="d-inline-block btn-red px-5 mb-3">UÇUŞ</div>
      <h1 className="fs-4 pb-4">
        {`${filter?.originAirport?.label} - ${filter?.destinationAirport?.label}, ${filter?.passengerCount} Yolcu`}
      </h1>
      <div className="d-flex mb-3">
        <p className="me-3 fw-semibold">Promosyon Kodu</p>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={() => updatePromotion(!promotion)}
          />
        </div>
      </div>

      {promotion && (
        <div>
          <p>
            Promosyon kodu seçeneği ile tüm Economy kabini Eco fly paketlerini
            %50 indirimle satın alabilirsiniz.
          </p>
          <p>
            Promosyon kodu seçeneği aktifken Eco fly paketi haricinde seçim
            yapılamamaktadır.
          </p>
        </div>
      )}
      <div className="border bg-light">
        <div className="list__filter d-flex justify-content-end align-items-center p-3">
          <div className="pe-4">Sıralama Kriteri</div>
          <button
            className="list__filter-btn me-2"
            type="button"
            onClick={() => handleFilter("price")}
          >
            Ekonomi Ücreti
          </button>
          <button
            className="list__filter-btn"
            type="button"
            onClick={() => handleFilter("arrivalDateTime")}
          >
            Kalkış Saati
          </button>
        </div>
        <div className="pt-3 px-4">
          {data.length &&
            data.map((flight, i) => <Card key={i} flight={flight} />)}
        </div>
      </div>
    </div>
  );
};
