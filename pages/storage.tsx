export default class Storage {
  readAll(): SingleLocation[] {
    const locations: SingleLocation[] = JSON.parse(
      localStorage.getItem("listLocations") ?? "[]",
    );
    return locations;
  }
  readOne(name: string): SingleLocation | undefined {
    const locations = this.readAll() ?? [];
    const singleLocation = locations.find((i) => i.name === name);
    return singleLocation;
  }

  readFirst(): SingleLocation {
    const locations = this.readAll() ?? [];
    const singleLocation = locations[0];
    return singleLocation;
  }

  addLocation(object: SingleLocation) {
    const location = this.readAll() ?? [];
    location.push(object);
    localStorage.setItem("listLocations", JSON.stringify(location));
  }

  deleteLocation(name: string) {
    const location = this.readAll() ?? [];
    const removedLocation = location.filter((i) => i.name != name);
    localStorage.setItem("listLocations", JSON.stringify(removedLocation));
  }
}
