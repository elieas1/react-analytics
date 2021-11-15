import React, { useContext } from "react";
import { context } from "../App";
import Button from "../components/Button";

const Cameras = (props) => {
  const { changes, isConfigOpen } = useContext(context);
  const success = props.cameras.map((cam, index) => {
    return <Button key={index} cam={cam} />;
  });
  return (
    <div
      className="cameraButtonsDiv"
      style={isConfigOpen ? { flex: 0.2 } : { flex: 1 }}
    >
      <div className="cameraButtons">
        <div className="cameraButtonsList">{success}</div>
        <div className="saveButtonDiv">
          <button
            onClick={() => {

              // Check_requirements(changes)
              // return
              console.log(changes)
              fetch("http://localhost:10500/configs", {
                method: "POST",
                body: JSON.stringify(changes),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(res => {
                console.log(res)
                if(res.ok){
                alert('Configurations saved succesfully')
              }}).catch(e=>{
                alert('failed to save')
              })
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cameras;
