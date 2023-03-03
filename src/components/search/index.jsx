import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Context } from "../../context";
import { SvgDate, SvgRight } from "../../assets/icons";
import "./style.scss";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Search = () => {
  const { register, handleSubmit, control } = useForm();
  let navigate = useNavigate();
  const [dropPerson, setDropPerson] = useState(false);
  const [submitCheck, setSubmitCheck] = useState(false);

  const [passengerCount, setPassengerCount] = useState(1);
  const { updateFilter, filter, getFilteredFlightData } = useContext(Context);

  const destination = [
    { value: "ESB", label: "Ankara Esenboğa (ESB)" },
    { value: "AYT", label: "Antalya (AYT)" },
    { value: "IST", label: "İstanbul (IST)" },
    { value: "ADB", label: "İzmir (ADB)" },
    { value: "SZF", label: "Samsun (SZF)" },
  ];
  const onSubmit = (data) => {
    const params = { ...data, passengerCount };
    updateFilter && updateFilter(params);
    setSubmitCheck(true);
  };

  const showToastMessage = () => {
    toast.error('Uçuş bulunamadı!', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };  

  useEffect(() => {
    if (submitCheck && Object.keys(filter).length > 0) {
      const getFlightData = getFilteredFlightData();
      if (getFlightData.length > 0) {
        setSubmitCheck(false);
        navigate("/list");
      }else{
        showToastMessage();
      }
    }
  }, [filter, getFilteredFlightData, navigate, submitCheck]);

  return (
    <form className="row w-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex col-12 col-md-7 px-0">
        <div className="search__group col">
          <Controller
            name="originAirport"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="search__select"
                classNamePrefix="search__select"
                options={destination}
                name="originAirport"
                isClearable
                placeholder="Nereden"
              />
            )}
          />
        </div>
        <div className="search__group col">
          <Controller
            name="destinationAirport"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="search__select"
                classNamePrefix="search__select"
                options={destination}
                name="destinationAirport"
                isClearable
                placeholder="Nereye"
              />
            )}
          />
        </div>
      </div>
      <div className="d-flex col-12 col-md-4 position-relative px-0">
        <div className="search__group search__date col">
          <input
            placeholder="Tarih"
            className="form-control form-control-dark"
          />
          <SvgDate />
        </div>
        <div className="search__group col">
          <div
            className="form-control form-control-dark cursor-pointer"
            aria-hidden="true"
            onClick={() => setDropPerson(!dropPerson)}
          >
            Yolcu <span className="count">{passengerCount}</span>
          </div>
        </div>
        <div
          className={`search__passenger mobile-space p-3  ${
            dropPerson ? "d-block" : "d-none"
          }`}
        >
          <p className="">Kabin ve yolcu seçimi</p>
          <div className="search__cabin-type">
            <label>
              <input
                type="radio"
                name="cabin"
                value="Economy"
                {...register("cabin")}
              />
              <span>Economy Class</span>
            </label>
            <label>
              <input
                type="radio"
                name="cabin"
                value="Bussines"
                {...register("cabin")}
              />
              <span>Bussines Class</span>
            </label>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div className="title">Yolcu</div>
            <div className="action">
              <button
                type="button"
                className="search__pass-btn btn btn-grey fs-5"
                disabled={passengerCount === 0}
                onClick={() =>
                  setPassengerCount((props) => (props > 0 ? --props : 0))
                }
              >
                -
              </button>
              <span className="mx-3">{passengerCount}</span>
              <button
                type="button"
                className="search__pass-btn btn btn-grey border-0 fs-5"
                onClick={() => setPassengerCount((props) => ++props)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-1 px-0">
        <button
          type="submit"
          className="search__btn btn btn-red w-100 rounded-0"
        >
          <SvgRight />
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};
