import React from "react";
import CanvasInfo from "./CanvasInfo";
import Input from "./Input";
import Select from "./Select";

const Parameter = ({ feature, cam, complete, setComplete }) => {
  let parameters = feature.parameters.map((param, index) => {
    if (param.type === "range") {
      return (
        <Input
          key={index}
          cam={cam}
          range_name={param.name}
          featureName={feature.name}
          type={feature.type}
          step={param.step}
          min={param.lowerLimit}
          max={param.upperLimit}
          end={param.unit}
          jsonName={param.jsonName}
          description={param.description}
        />
      );
    } else if (param.type === "select") {
      return (
        <Select
          key={index}
          cam={cam}
          paramName={param.name}
          featureName={feature.name}
          type={feature.type}
          step={param.step}
          min={param.lowerLimit}
          max={param.upperLimit}
          end={param.unit}
          jsonName={param.jsonName}
          description={param.description}
        />
      );
    } else if (param.type === "canvas") {
      return (
        <CanvasInfo
          cam={cam}
          feature={feature}
          key={index}
          paramName={param.name}
          jsonName={param.jsonName}
          complete={complete}
          setComplete={setComplete}
          description={param.description}
        />
      );
    }
    return null;
  });
  if (feature.parameters.length === 0) {
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          gridColumn: "span 3",
          justifyContent: "center",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        This module requires only enabling/disabling.
      </div>
    );
  }
  return <>{parameters}</>;
};

export default Parameter;
