import React, { useContext, useState } from "react";
import { context } from "../App";
import Canvas from "../components/Canvas";
import FeatureListItem from "../components/FeatureListItem";
import Parameter from "../components/Parameter";
import { humanModules } from "../utils/humanModules";
import { human, vehicle } from "../utils/variables";
import { vehicleModules } from "../utils/vehicleModules";

const Configs = () => {
  const [featureType, setFeatureType] = useState(human);
  const [currentFeature, setCurrentFeature] = useState(humanModules[0]);
  const [savedHumanFeature, setSavedHumanFeature] = useState(null);
  const [savedVehicleFeature, setSavedVehicleFeature] = useState(null);
  const [complete, setComplete] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const { isConfigOpen, currentCam } = useContext(context);

  const human_features = humanModules.map((feature, index) => {
    return (
      <div
        style={
          currentFeature === feature ? { backgroundColor: "#353841" } : null
        }
        key={index}
        className="featureListItem"
      >
        <FeatureListItem
          currentFeature={currentFeature}
          feature={feature}
          setCurrentFeature = {setCurrentFeature}
          setOverlay={setOverlay}
        />
      </div>
    );
  });

  const vehicle_features = vehicleModules.map((feature, index) => {
    return (
      <div
        style={
          currentFeature === feature ? { backgroundColor: "#353841" } : null
        }
        key={index}
        className="featureListItem"
        onClick={() => setCurrentFeature(feature)}
      >
        <FeatureListItem
          currentFeature={currentFeature}
          feature={feature}
          setOverlay={setOverlay}
        />
      </div>
    );
  });
  return (
    <div
      className="right"
      style={isConfigOpen ? { flex: 0.8 } : { display: "none" }}
    >
      <div className="feature-top">
        <div className="empty-space"></div>
        <div className="feature-type-buttons">
          <button
            className="human"
            style={
              featureType === human ? { backgroundColor: "#1EBEEF" } : null
            }
            disabled={featureType === human}
            onClick={() => {
              setFeatureType(human);
              setSavedVehicleFeature(currentFeature);
              setCurrentFeature(() => {
                if (savedHumanFeature !== null) {
                  return savedHumanFeature;
                } else {
                  return humanModules[0];
                }
              });
            }}
          >
            HUMAN ANALYTICS
          </button>
          <button
            className="vehicle"
            style={
              featureType === vehicle ? { backgroundColor: "#1EBEEF" } : null
            }
            disabled={featureType === vehicle}
            onClick={() => {
              setFeatureType(vehicle);
              setSavedHumanFeature(currentFeature);
              setCurrentFeature(() => {
                if (savedVehicleFeature !== null) {
                  return savedVehicleFeature;
                } else {
                  return vehicleModules[0];
                }
              });
            }}
          >
            VEHICLE ANALYTICS
          </button>
        </div>
      </div>
      <div className="features">
        <div className="featureList">
          {featureType === human ? human_features : vehicle_features}
        </div>
        <div className="featureParams">
          <div
            style={
              overlay ? { display: "block" } : { display: "none", zIndex: 0 }
            }
            className="overlay"
          ></div>
          <div className="canvasBlock">
            <Canvas
              cam={currentCam}
              feature={currentFeature}
              complete={complete}
              setComplete={setComplete}
            />
          </div>
          <div className="paramBlock">
            <Parameter
              feature={currentFeature}
              cam={currentCam}
              complete={complete}
              setComplete={setComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configs;
