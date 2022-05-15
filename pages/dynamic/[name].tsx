import Link from "next/link";
import AddButton from "pages/components/add-to-list";
import { useEffect, useState } from "react";
import Storage from "pages/storage";
import AddedSign from "pages/components/AddedSign";

const storage = new Storage();

export default function SingleLocation(forecast: Forecast) {
  const singleLocation: SingleLocation = {
    name: forecast.location.name,
    region: forecast.location.region,
    country: forecast.location.country,
    temperature: forecast.current.temp_c,
    code: forecast.current.condition.code,
    condition: forecast.current.condition.text,
    localTime: forecast.current.last_updated,
    uv: forecast.current.uv,
    rain: forecast["forecast"]["forecastday"]["0"]["day"][
      "daily_chance_of_rain"
    ],
    aq: forecast["current"]["air_quality"]["pm10"],
    sunrise: forecast["forecast"]["forecastday"]["0"]["astro"]["sunrise"],
    sunset: forecast["forecast"]["forecastday"]["0"]["astro"]["sunset"],
  };

  const [added, setAdded] = useState<boolean>(false);
  useEffect(() => {
    const locations = storage.readAll();
    const addedLocations = locations.map((i) => i.name);
    setAdded(addedLocations.includes(singleLocation.name));
  }, [singleLocation.name]);

  return (
    <div className="weather-page__main-body">
      <div className="button__box">
        <Link href="/">
          <button className="button__box-button">Back</button>
        </Link>
        {!added ? (
          <AddButton
            singleLocation={singleLocation}
            setAdded={setAdded}
          ></AddButton>
        ) : (
          <AddedSign />
        )}
      </div>
      <div className="main-weather-info__box">
        <p className="main-weather-info__location">{singleLocation.name}</p>
        <p className="main-weather-info__location">{singleLocation.country}</p>
        <p className="main-weather-info__temperature">
          {singleLocation.temperature}
        </p>
      </div>
      <div className="data-block__box">
        <div className="data-block__column">
          <p className="data-column__title">Local Time</p>
          <p className="data-column__value">{singleLocation.localTime}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">UV</p>
          <p className="data-column__value">{singleLocation.uv}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">Rain</p>
          <p className="data-column__value">{singleLocation.rain}</p>
        </div>
        <div className="data-block__column">
          <p className="data-column__title">AQ</p>
          <p className="data-column__value">{singleLocation.aq}</p>
        </div>
      </div>
      <div className="sunrise-sunset__box">
        <p className="sunrise-sunset__title">Sunrise & Sunset</p>
        <div className="sunrise-sunset__graph"></div>
        <div className="sunrise-sunset__data">
          <div className="sunrise-sunset__data-row">
            <p className="sunrise-sunset__data-title">Sunrise</p>
            <p className="sunrise-sunset__data-value">
              {singleLocation.sunrise}
            </p>
          </div>
          <div className="sunrise-sunset__data-row">
            <p className="sunrise-sunset__data-title">Sunset</p>
            <p className="sunrise-sunset__data-value">
              {singleLocation.sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

SingleLocation.getInitialProps = async ({ query: location }: any) => {
  const res = await fetch(
    `${process.env.URL}/api/fullLocation?fullLocation=${location.name}`,
  );
  const json: Forecast = await res.json();
  return json;
};
