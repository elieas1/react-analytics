import React, { useContext } from "react";
import { context } from "../App";

const Button = ({ cam }) => {
  const { currentCam, setConfigs, setIsConfigOpen, setCurrentCam } =
    useContext(context);
  return (
    <button
      style={
        currentCam === cam
          ? {
              borderColor: "rgb(12, 252, 252)",
              boxShadow: "0px 0px 10px rgb(12, 252, 252)",
            }
          : {}
      }
      className="cameraButton"
      onClick={() => {
        setConfigs(true);
        setCurrentCam(cam);
        setIsConfigOpen(true);
      }}
    >
      {cam.Name}
    </button>
  );
};

export default Button;
