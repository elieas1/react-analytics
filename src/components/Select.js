import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../App";

const Select = ({ paramName, cam, type, featureName, description, jsonName }) => {
  const { changes, setChanges } = useContext(context);
  const [selected, setSelected] = useState("---");

  const ref = useRef();

  useEffect(() => {
    if (changes[cam.Id][type][featureName][jsonName] === true) {
      setSelected("Clockwise");
    } else if (changes[cam.Id][type][featureName][jsonName] === false) {
      setSelected("Counter-Clockwise");
    } else {
      setSelected("---");
    }
  }, [changes, cam.Id, type, featureName, jsonName]);

  const handleChange = (e) => {
    let copy = changes;
    setSelected(e.target.value);
    if (e.target.value === "Clockwise") {
      copy[cam.Id][type][featureName][jsonName] = true;
    } else if (e.target.value === "Counter-Clockwise") {
      copy[cam.Id][type][featureName][jsonName] = false;
    } else {
      delete copy[cam.Id][type][featureName][jsonName];
    }
    setChanges(copy);
  };

  return (
    <div className="selectDiv">
      <div className="selectInfo">
        <span className="selectName">{paramName}</span>
        <div className="rangeInfoRight">
          <div style={{ position: "relative" }}>
            <span
              onClick={(e) => {
                if (ref.current.classList.contains("opened")) {
                  ref.current.classList.remove("opened");
                  e.target.classList.remove("clicked");
                } else {
                  ref.current.classList.add("opened");
                  e.target.classList.add("clicked");
                }
              }}
              className="infoIcon2"
              title="Click for info"
            >
              i
            </span>
            <div ref={ref} className="description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <select
          value={selected}
          className="select"
          onChange={(e) => handleChange(e)}
        >
          <option>---</option>
          <option>Clockwise</option>
          <option>Counter-Clockwise</option>
        </select>
      </div>
    </div>
  );
};

export default Select;
