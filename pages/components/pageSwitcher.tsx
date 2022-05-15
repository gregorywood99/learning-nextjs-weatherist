import Storage from "../storage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const storage = new Storage();

const PageSwitcher = ({
  setIndex,
  index,
}: {
  setIndex: Dispatch<SetStateAction<number | null>>;
  index: number | null;
}) => {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    setNumber(storage.readAll().length);
  }, [index, setIndex]);

  return (
    <div className="page-switcher__box">
      {[...Array(number).keys()].slice().map((i) => {
        return (
          <button
            className={
              i === index
                ? "page-switcher__button selected"
                : "page-switcher__button not-selected"
            }
            key={i}
            onClick={() => {
              setIndex(i);
            }}
          ></button>
        );
      })}
    </div>
  );
};

export default PageSwitcher;
