import React, { useState } from "react";
import { CategoryCard, TabContent, TabNavItem } from "../index";
import { SvgDown } from "../../assets/icons";
import "./style.scss";

export const Card = ({ flight }) => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="flight mb-3">
      <div className="row">
        <div className="col-12 col-md-6 px-1">
          <div className="flight__card d-flex align-items-center justify-content-between">
            <div className="flight__info d-flex align-items-center justify-content-between w-75">
              <div className="flight__origin">
                <div className="fw-bolder">
                  {flight?.arrivalDateTimeDisplay}
                </div>
                <div className="text-secondary">
                  {flight?.originAirport?.code}
                </div>
                <div className="fs-7 text-secondary">
                  {" "}
                  {flight?.originAirport?.city?.name}
                </div>
              </div>
              <div className="flight__destination text-end">
                <div className="fw-bolder">
                  {flight?.departureDateTimeDisplay}
                </div>
                <div className="text-secondary">
                  {" "}
                  {flight?.destinationAirport?.code}
                </div>
                <div className="fs-7 text-secondary">
                  {flight?.destinationAirport?.city?.name}
                </div>
              </div>
            </div>
            <div className="flight__duration w-25 ms-5">
              <div className="fs-7 text-secondary">Uçuş Süresi</div>
              <div className="fw-bolder">{flight?.flightDuration}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 px-1">
          <TabNavItem
            id="tab1"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <div className="flight__card d-flex align-items-center">
              <div className="form-check d-flex p-0 me-4">
                <input
                  className="flight__check"
                  type="radio"
                  name="cabin"
                  id="economyCabin"
                  checked={activeTab === "tab1"}
                  readOnly
                />

                <span className="fs-7 ps-2">ECONOMY</span>
              </div>

              <div>
                <div className="fs-7 text-secondary">Yolcu Başına</div>
                <div className="fw-bolder">
                  {
                    flight?.fareCategories?.ECONOMY?.subcategories[0]?.price
                      ?.currency
                  }{" "}
                  {
                    flight?.fareCategories?.ECONOMY?.subcategories[0]?.price
                      ?.amount
                  }
                </div>
                <SvgDown />
              </div>
            </div>
          </TabNavItem>
        </div>
        <div className="col-12 col-md-3 px-1">
          <TabNavItem
            id="tab2"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <div className="flight__card d-flex align-items-center">
              <div className="form-check d-flex p-0 me-4">
                <input
                  className="flight__check"
                  type="radio"
                  name="cabin"
                  id="businessCabin"
                  checked={activeTab === "tab2"}
                  readOnly
                />
                <span className="fs-7 ps-2">BUSINESS</span>
              </div>
              <div>
                <div className="fs-7 text-secondary">Yolcu Başına</div>
                <div className="fw-bolder">
                  {" "}
                  {
                    flight?.fareCategories?.BUSINESS?.subcategories[0]?.price
                      ?.currency
                  }{" "}
                  {
                    flight?.fareCategories?.BUSINESS?.subcategories[0]?.price
                      ?.amount
                  }
                </div>
                <SvgDown />
              </div>
            </div>
          </TabNavItem>
        </div>
      </div>
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab} flight={flight}>
          <div className="row">
            {flight?.fareCategories?.ECONOMY?.subcategories.map(
              (category, i) => (
                <CategoryCard key={i} category={category} />
              )
            )}
          </div>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <div className="row">
            {flight?.fareCategories?.BUSINESS?.subcategories.map(
              (category, i) => (
                <CategoryCard key={i} category={category} />
              )
            )}
          </div>
        </TabContent>
      </div>
    </div>
  );
};
