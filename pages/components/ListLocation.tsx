import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SavedLocation from "./SavedLocation";
import Storage from "../storage";

const storage = new Storage();

type ListLocationProps = {
  index: number;
  setIndex: Dispatch<SetStateAction<number | null>>;
};

const ListLocation = ({ index, setIndex }: ListLocationProps) => {
  const [location, setLocation] = useState<SingleLocation | null>(null);

  useEffect(() => {
    setLocation(storage.readAll()[index]);
  }, [index]);

  return (
    <div>
      {!location ? (
        <h2>No Locations in List!</h2>
      ) : (
        <SavedLocation
          setIndex={setIndex}
          location={location}
          key={index}
          index={index}
          setLocation={setLocation}
        />
      )}
    </div>
  );
};

export default ListLocation;
