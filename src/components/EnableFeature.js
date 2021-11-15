import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";

const EnableFeature = ({
  cam,
  type,
  featureName,
  featureDescription,
  setOverlay,
}) => {
  const [isDescShowing, setIsDescShowing] = useState(false);
  const [checked, setChecked] = useState(true);
  const { changes, setChanges } = useContext(context);
  const handleClick = () => {
    let copy = changes;
    setChecked(!checked);
    copy[cam.Id][type][featureName].enabled = !checked;
    setChanges(copy);
  };

  useEffect(() => {
    if (checked) {
      setOverlay(false);
    } else {
      setOverlay(true);
    }
  }, [checked,setOverlay]);

  return (
    <div className="featureInfo">
      <span className="featureName">{featureName}</span>
      <label>Enabled</label>
      <input
        type="checkbox"
        className="checkbox"
        onChange={() => handleClick()}
        checked={checked}
      ></input>
      <div className="featureDesc">
        <div
          className="featureDescIcon"
          onMouseOver={() => setIsDescShowing(true)}
          onMouseOut={() => setIsDescShowing(false)}
        >
          ?
        </div>
        <div
          style={isDescShowing ? { display: "block" } : null}
          className="featureDescText"
        >
          {featureDescription}
        </div>
      </div>
    </div>
  );
};

export default EnableFeature;
