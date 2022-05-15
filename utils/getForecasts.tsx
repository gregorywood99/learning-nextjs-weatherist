export const getForecasts = async (results: Autocomplete[]) => {
  return await Promise.all(
    results.map(async (result) => {
      const forecast = await fetch(`/api/location?location=${result.name}`);
      const current: CurrentFull = await forecast.json();
      return current;
    }),
  );
};
