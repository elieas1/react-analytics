import { createContext, useEffect, useState } from "react";
import "./App.css";
import Cameras from "./pages/Cameras";
import Configs from "./pages/Configs";
import Start from "./pages/Start";

export const context = createContext();

function App() {
  const [cameras, setCameras] = useState([]);
  const [start, setStart] = useState(false);
  const [cams, setCams] = useState(false);
  const [configs, setConfigs] = useState(false);
  const [currentCam, setCurrentCam] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    var interval = setInterval(() => {
      if (
        JSON.parse(window.sessionStorage.getItem("cameras")) !== null &&
        JSON.parse(window.sessionStorage.getItem("cameras")).length !== 0
      ) {
        setCameras(JSON.parse(window.sessionStorage.getItem("cameras")));
        JSON.parse(window.sessionStorage.getItem("cameras")).forEach((cam) => {
          setChanges((changes) => {
            return {
              ...changes,
              [cam.Id]: {
                "Admin Configs": {
                  "Camera fps": cam.fps,
                  "GPU id": 0,
                  "Shadow Age": 10,
                  "Tracker Confidence": 0.7,
                },
                "AI Modules": {
                  "Gender Classification": { enabled: true },
                  "Face Mask Detection": { enabled: true },
                  "Clothes Detection": { enabled: true },
                  "Clothes Color Classification": { enabled: true },
                  "Vehicle Color Classification": { enabled: true },
                  "Vehicle Type Classification": { enabled: true },
                  "Vehicle Make Classification": { enabled: true },
                  "Personal Protective Equipment Detection": { enabled: true },
                },
                "Vehicle Modules": {
                  "Wrong Way Detection": { enabled: true },
                  "Vehicle Speed Estimation": { enabled: true },
                  "Illegal Turn Detection": { enabled: true },
                  "Congestion Detection": { enabled: true },
                },
                "Human Modules": {
                  "Abandoned Luggage": { enabled: true },
                  "Loitering Detection": { enabled: true },
                  "Wrong Way Detection": { enabled: true },
                  "Proximity Detection": { enabled: true },
                  "Perimeter Protection": { enabled: true },
                  "Tailgating Detection": { enabled: true },
                  "Crowd Density Estimation": { enabled: true },
                },
              },
            };
          });
        });
        setStart(true);
        clearInterval(interval);
      }
    }, 200);
  }, []);

  return (
    <div className="App">
      {start && (
        <Start
          showCams={setCams}
          setStart={setStart}
          changes={changes}
          setChanges={setChanges}
        />
      )}
      <div className="root">
        <context.Provider
          value={{
            setConfigs,
            isConfigOpen,
            setIsConfigOpen,
            changes,
            setChanges,
            currentCam,
            setCurrentCam,
          }}
        >
          {cams && <Cameras cameras={cameras} />}
          {configs && <Configs />}
        </context.Provider>
      </div>
    </div>
  );
}

export default App;
