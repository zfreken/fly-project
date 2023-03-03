import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import { SvgCheck, SvgError } from "../../assets/icons";
import "./style.scss";

export const Completed = () => {
  const { selectedFlight, sumTotal } = useContext(Context);

  return (
    <div className="completed container py-5">
      <>
        {selectedFlight.status === "AVAILABLE" ? (
          <>
            <div className="border-bottom pb-4 mb-4">
              <div className="available fw-bolder fs-4">
                <span className="me-4">
                  <SvgCheck className="completed__svg text-success" />
                </span>
                Kabin seçiminiz tamamlandı.
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="fs-4">Toplam Tutar</div>
              <div className="fs-4 text-primary">TRY {sumTotal()}</div>
            </div>
          </>
        ) : (
          <div className="border-bottom pb-4 mb-4">
            <div className="error fw-bolder fs-4">
              <span className="me-4">
                <SvgError className="completed__svg text-danger" />
              </span>
              Kabin seçiminiz tamamlanamadı.
            </div>
          </div>
        )}
      </>
      <div className="d-flex justify-content-end mt-4">
        <Link to="/" relative="path" className="btn btn-red rounded-0 px-4">
          Başa Dön
        </Link>
      </div>
    </div>
  );
};
