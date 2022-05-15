import { useState } from "react";
import { getForecasts } from "../../utils/getForecasts";
import ListLocation from "./ListLocation";
import PageSwitcher from "./pageSwitcher";
import Results from "./results";

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Autocomplete[]>([]);
  const [index, setIndex] = useState<number | null>(0);
  const [forecasts, setForecasts] = useState<CurrentFull[]>([]);

  async function requestResults(): Promise<Autocomplete[]> {
    const res = await fetch(`/api/search?location=${location}`);
    const json: Autocomplete[] = await res.json();
    setResults(json);
    return json;
  }

  async function requestForecasts(results: Autocomplete[]) {
    const allForecasts = await getForecasts(results);
    setForecasts(allForecasts);
  }

  console.log(results, forecasts);

  return (
    <div className="weather-page__main-body">
      <div className="search__box">
        <form
          className="search-bar__box"
          onSubmit={async (e) => {
            e.preventDefault();
            const results = await requestResults();
            await requestForecasts(results);
          }}
        >
          <input
            className="search-bar__input"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
          <button className="search-bar__submit">Go</button>
        </form>
      </div>
      {results.length > 0 && forecasts.length > 0 && (
        <Results results={results} forecasts={forecasts} />
      )}
      {index !== null ? (
        <>
          {results.length === 0 && forecasts.length === 0 && (
            <>
              <PageSwitcher setIndex={setIndex} index={index} />
              <ListLocation setIndex={setIndex} index={index} />
            </>
          )}
        </>
      ) : (
        <h2>No Location selected!</h2>
      )}
    </div>
  );
};

export default SearchParams;
