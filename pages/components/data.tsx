import { useRouter } from "next/router";

const Data = ({
  data: result,
  forecast: current,
}: {
  data: Autocomplete;
  forecast: CurrentFull;
}) => {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={() => {
          router.push({
            pathname: "/dynamic/[name]",
            query: { name: result.name },
          });
        }}
        className="search-results__box"
      >
        <div className="search-result">
          <div data-location={result.name} className="search-result__info">
            <p className="search-result__title">{result.name}</p>
            <p className="search-result__temperature">
              {current.current.temp_c}°
            </p>
          </div>
          {/* <Image className="search-result__icon" alt={current.condition.text} src={image} /> */}
        </div>
      </div>
    </div>
  );
};

export default Data;
