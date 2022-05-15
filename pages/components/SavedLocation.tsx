import { Dispatch, SetStateAction } from "react";
import { refresher } from "./refresher";
import Storage from "../storage";

const storage = new Storage();

const SavedLocation = ({
  location,
  index,
  setIndex,
  setLocation,
}: {
  location: SingleLocation;
  index: number;
  setIndex: Dispatch<SetStateAction<number | null>>;
  setLocation: Dispatch<SetStateAction<SingleLocation | null>>;
}) => {
  return (
    <div>
      <div className="button__box">
        <button
          className="button__box-button"
          onClick={async () => {
            setLocation(await refresher(index));
          }}
        >
          Refresh
        </button>
        <button
          className="button__box-button"
          onClick={() => {
            storage.deleteLocation(location.name);
            setIndex(null);
          }}
        >
          Remove from List
        </button>
      </div>
      <div className="main-weather-info__box">
        <p className="main-weather-info__location">{location.name}</p>
        <p className="main-weather-info__location">{location.country}</p>
        <p className="main-weather-info__temperature">
          {location.temperature}°
        </p>
      </div>
      <div className="data-block__box">
        <div className="data-block__column">
          <p className="data-column__title">Local Time</p>
          <p className="data-column__value">{location.localTime}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">UV</p>
          <p className="data-column__value">{location.uv}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">Rain</p>
          <p className="data-column__value">{location.rain}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">AQ</p>
          <p className="data-column__value">{location.aq}</p>
        </div>
      </div>
      <div className="sunrise-sunset__box">
        <p className="sunrise-sunset__title">Sunrise & Sunset</p>
        <div className="sunrise-sunset__graph"></div>
        <div className="sunrise-sunset__data">
          <div className="sunrise-sunset__data-row">
            <p className="sunrise-sunset__data-title">Sunrise</p>
            <p className="sunrise-sunset__data-value">{location.sunrise}</p>
          </div>
          <div className="sunrise-sunset__data-row">
            <p className="sunrise-sunset__data-title">Sunset</p>
            <p className="sunrise-sunset__data-value">{location.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedLocation;
