import { Dispatch, SetStateAction } from "react";
import Storage from "../storage";

const storage = new Storage();

const AddButton = ({
  singleLocation,
  setAdded,
}: {
  singleLocation: SingleLocation;
  setAdded: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <button
        className="button__box-button"
        onClick={() => {
          storage.addLocation(singleLocation);
          setAdded(true);
        }}
      >
        Add to List
      </button>
    </div>
  );
};

export default AddButton;
