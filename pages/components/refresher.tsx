import Storage from "../storage";
const storage = new Storage();

export const refresher = async (index: number) => {
  await Promise.all(
    storage.readAll().map(async (location) => {
      storage.deleteLocation(location.name);
      const res = await fetch(
        `http://localhost:3000/api/fullLocation?fullLocation=${location.name}`,
      );
      const json: Forecast = await res.json();
      const newLocation: SingleLocation = {
        name: json.location.name,
        region: json.location.region,
        country: json.location.country,
        temperature: json.current.temp_c,
        code: json.current.condition.code,
        condition: json.current.condition.text,
        localTime: json.current.last_updated,
        uv: json.current.uv,
        rain: json["forecast"]["forecastday"]["0"]["day"][
          "daily_chance_of_rain"
        ],
        aq: json["current"]["air_quality"]["pm10"],
        sunrise: json["forecast"]["forecastday"]["0"]["astro"]["sunrise"],
        sunset: json["forecast"]["forecastday"]["0"]["astro"]["sunset"],
      };
      storage.addLocation(newLocation);
    }),
  );

  return storage.readAll()[index];
};
