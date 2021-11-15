import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../App";

const FeatureListItem = ({ feature, setOverlay, currentFeature,setCurrentFeature }) => {
  const [checked, setChecked] = useState(true);
  const { changes, setChanges, currentCam } = useContext(context);

  const ref = useRef();

  const handleChange = (e) => {
    setChecked((checked) => !checked);
    let copy = changes;
    copy[currentCam.Id][feature.type][feature.name].enabled =
      !checked;
    setChanges({ ...copy });
  };

  useEffect(() => {
    if (changes[currentCam.Id][feature.type][feature.name].enabled === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [feature.type, feature.name, changes, currentCam]);

  useEffect(() => {
    if (
      changes[currentCam.Id][currentFeature.type][currentFeature.name]
        .enabled === true
    ) {
      setOverlay(false);
    } else {
      setOverlay(true);
    }
  }, [currentFeature, setOverlay, currentCam, changes]);

  return (
    <>
      <div onClick={() => setCurrentFeature(feature)} className="featureName">
        <span>{feature.name}</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <label className="checkboxContainer">
            <div className="bigbox">
              <div
                className="smallbox"
                style={
                  checked ? { backgroundColor: "#28B5E0" } : { display: "none" }
                }
              ></div>
            </div>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => handleChange(e)}
            />
            <span
              className="checkboxText"
              style={
                checked
                  ? { textShadow: "0px 0px 5px #0fffeb", color: "#0fffeb" }
                  : {}
              }
            >
              {checked ? " Enabled" : " Disabled"}
            </span>
          </label>
        </div>
        <div
          onClick={() => setCurrentFeature(feature)}
          style={{ textAlign: "end" }}
        >
          <div style={{ padding: "0px 10px 0px 0px" }}>
            <span
              onClick={(e) => {
                if (ref.current.style.maxHeight === "200px") {
                  ref.current.style.maxHeight = "0";
                  e.target.classList.remove("clicked");
                } else {
                  e.target.classList.add("clicked");
                  ref.current.style.maxHeight = "200px";
                }
              }}
              className="infoIcon"
              title="Click for info"
            >
              i
            </span>
          </div>
        </div>
        <div
          ref={ref}
          className="featureDescription"
          onClick={() => setCurrentFeature(feature)}
        >
          {feature.description}
        </div>
      </div>
    </>
  );
};

export default FeatureListItem;
