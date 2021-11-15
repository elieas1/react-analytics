import React, { useContext, useRef } from "react";
import { context } from "../App";

const CanvasInfo = ({
  paramName,
  cam,
  feature,
  setComplete,
  description,
  jsonName,
}) => {
  const { changes, setChanges } = useContext(context);
  const ref = useRef();

  const handleClick = () => {
    let copy = changes;
    delete copy[cam.Id][feature.type][feature.name][jsonName];
    setChanges({ ...copy });
  };

  return (
    <div className="canvasDiv">
      <div className="canvasInfo">
        <span className="canvasName">{paramName}</span>
        <div className="canvasInfoRight">
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
      <div className="canvasUtils">
        <div>
          <span className="canvasParamInfo">
            {feature.required_points === "unlimited"
              ? `Draw desired area points on the image above (No area limit)`
              : feature.required_arrays > 1
              ? `Draw ${feature.required_arrays} lines of ${feature.required_points} points each on the image above`
              : `Draw ${feature.required_points} points on the image above`}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {feature.required_arrays === "unlimited" && (
            <button
              style={{ backgroundColor: "#ff44ff" }}
              className="resetButton"
              onClick={() => {
                setComplete(true);
              }}
            >
              COMPLETE{" "}
            </button>
          )}
          <button onClick={handleClick} className="resetButton">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasInfo;
