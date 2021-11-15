import React, { useContext, useRef } from "react";
import { context } from "../App";

const Input = ({ cam, type, featureName, range_name, min, max, step, end, description, jsonName}) => {

  const { changes, setChanges } = useContext(context);

  const ref = useRef()

  const handleInput = (e) => {
    let copy = changes;
    if (e.target.value % 1 === 0) {
      copy[cam.Id][type][featureName][jsonName] = parseInt(e.target.value);
    } else {
      copy[cam.Id][type][featureName][jsonName] = parseFloat(e.target.value);
    }
    setChanges({...copy});
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <div className="rangeInfo">
        <span className="rangeName">{range_name}</span>
        <div className="rangeInfoRight">
          <div style={{ position: "relative" }}>
            <span
              onClick={(e) => {
                console.log(e.target);
                if (ref.current.classList.contains("opened")) {
                  ref.current.classList.remove("opened");
                  e.target.classList.remove("clicked");
                } else {
                  e.target.classList.add("clicked");
                  ref.current.classList.add("opened");
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
          <span className="rangeValue">
            {typeof changes[cam.Id][type][featureName][jsonName] !== "undefined"
              ? changes[cam.Id][type][featureName][jsonName] + " " + end
              : "---"}
          </span>
        </div>
      </div>
      <div className="range">
        <input
          onInput={(e) => handleInput(e)}
          type="range"
          value={changes[cam.Id][type][featureName][jsonName] || min}
          min={min}
          max={max}
          step={step || 1}
        />
      </div>
    </div>
  );
}

export default Input;
