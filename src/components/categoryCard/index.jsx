import React, { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

import "./style.scss";

export const CategoryCard = ({ category }) => {
  const { promotion, updateSelectedFlight } = useContext(Context);
  let navigate = useNavigate();

  const isPromotion = useMemo(
    () => () => {
      return promotion && category?.brandCode !== "ecoFly";
    },
    [promotion, category?.brandCode]
  );

  const handleFlight = (param) => {
    updateSelectedFlight(param);
    navigate("/completed");
  };
  return (
    <div className="col-12 col-md-4 px-1 mt-3">
      <div className="card h-100">
        <div className="card-header d-flex justify-content-between bg-grey px-2 py-4">
          <div>{category?.brandCode}</div>
          <div>
            <span className="card__currency">{category?.price?.currency}</span>
            <span className="fw-bolder"> {category?.price?.amount}</span>
          </div>
        </div>
        <div className="card__body">
          <ul className="list-group list-group-flush">
            {category?.rights.map((right, i) => (
              <li key={i} className="list-group-item">
                {right}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          disabled={isPromotion()}
          className="card__btn btn btn-red rounded-0"
          onClick={() => handleFlight(category)}
        >
          Uçuşu Seç
        </button>
      </div>
    </div>
  );
};
