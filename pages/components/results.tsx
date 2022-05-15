import Data from "./data";

const Results = ({
  results,
  forecasts,
}: {
  results: Autocomplete[];
  forecasts: CurrentFull[];
}) => {
  return (
    <div className="search">
      {!results ? (
        <h2>No Location Found</h2>
      ) : (
        results.map((result, index) => (
          <Data data={result} forecast={forecasts[index]} key={result.name} />
        ))
      )}
    </div>
  );
};

export default Results;
