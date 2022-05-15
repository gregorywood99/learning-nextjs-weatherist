export class SearchResponse {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  async searchQuery(location: string): Promise<CurrentFull> {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.key}&q=${location}&aqi=no`,
    );
    return response.json();
  }

  async singleLocationInfo(location: string): Promise<Forecast> {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${location}&days=1&aqi=yes&alerts=no`,
    );
    return response.json();
  }

  async searchResults(location: string): Promise<Autocomplete[]> {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${this.key}&q=${location}}`,
    );
    return response.json();
  }
}
