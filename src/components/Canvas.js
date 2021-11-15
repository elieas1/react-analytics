import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { context } from "../App";
import {
  drawExisting,
  drawRect,
  getCoords,
  Point_positions,
} from "../utils/functions";
import { lineWidth } from "../utils/variables";

const Canvas = ({ cam, feature, complete, setComplete }) => {
  const { changes, setChanges } = useContext(context);
  const [index, setIndex] = useState(0);
  const [array, setArray] = useState(0);
  const [points, setPoints] = useState([]);
  const canvasRef = useRef();
  const imageRef = useRef();
  const [canvasHeight, setCanvasHeight] = useState(false);

  const [lastPoints, setLastPoints] = useState({});

  const colorArray = useMemo(() => ["#0000ff", "#ffff00"], []);

  // check if complete button is clicked
  useEffect(() => {
    if (complete) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      if (points.length < 3) {
        setComplete(false);
        alert("The minimum is 3 lines");
      } else {
        if (index % 2 === 0) {
          ctx.strokeStyle = colorArray[0];
        } else {
          ctx.strokeStyle = colorArray[1];
        }
        ctx.lineTo(lastPoints.x, lastPoints.y);
        ctx.closePath();
        ctx.stroke();
        setLastPoints({});
        let copy = changes;
        if (
          feature.canvas === true &&
          typeof copy[cam.Id][feature.type][feature.name][
            feature.parameters[0].jsonName
          ] === "undefined"
        ) {
          console.log("hi");
          copy[cam.Id][feature.type][feature.name][
            feature.parameters[0].jsonName
          ] = [];
          copy[cam.Id][feature.type][feature.name][
            feature.parameters[0].jsonName
          ].push(points);
        } else {
          copy[cam.Id][feature.type][feature.name][
            feature.parameters[0].jsonName
          ].push(points);
        }
        setChanges(copy);
        setComplete(false);
        setIndex(0);
        setPoints([]);
      }
    }
  }, [
    complete,
    setComplete,
    cam.Id,
    changes,
    feature,
    setChanges,
    colorArray,
    lastPoints,
    index,
    points,
  ]);

  //draw object on canvas if object exists
  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (
      feature.canvas === true &&
      typeof changes[cam.Id][feature.type][feature.name][
        feature.parameters[0].jsonName
      ] !== "undefined"
    ) {
      drawExisting(
        changes[cam.Id][feature.type][feature.name][
          feature.parameters[0].jsonName
        ],
        canvas,
        ctx
      );
    }

    if (feature.required_arrays > 1) {
      let pointsCopy = [];
      for (let i = 0; i < feature.required_arrays; i++) {
        pointsCopy.push([]);
        setPoints(pointsCopy);
      }
    } else {
      setPoints([]);
    }
  }, [feature, cam.Id, changes]);

  //add image src
  useEffect(() => {
    const imageBlob = b64toBlob(cam.src, "image/jpeg", 512);
    imageRef.current.src = window.URL.createObjectURL(imageBlob);
    setCanvasHeight(true);
  }, [cam.src]);

  //change canvas dimensions
  useEffect(() => {
    setTimeout(() => {
      if (canvasHeight) {
        canvasRef.current.height = imageRef.current.height;
        canvasRef.current.width = imageRef.current.width;
      }
    }, 1000);
  }, [canvasHeight]);

  //initiate array and index
  useEffect(() => {
    setArray(() => {
      if (
        feature.canvas === true &&
        typeof changes[cam.Id][feature.type][feature.name][
          feature.parameters[0].jsonName
        ] !== "undefined"
      ) {
        if (
          Array.isArray(
            changes[cam.Id][feature.type][feature.name][
              feature.parameters[0].jsonName
            ][0]
          )
        ) {
          return changes[cam.Id][feature.type][feature.name][
            feature.parameters[0].jsonName
          ].length;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    });
    setIndex(() => {
      if (
        feature.canvas === true &&
        typeof changes[cam.Id][feature.type][feature.name][
          feature.parameters[0].jsonName
        ] !== "undefined"
      ) {
        if (feature.required_points === "unlimited") {
          return 0;
        } else {
          if (
            Array.isArray(
              changes[cam.Id][feature.type][feature.name][
                feature.parameters[0].jsonName
              ][0]
            )
          ) {
            let i = 0;
            changes[cam.Id][feature.type][feature.name][
              feature.parameters[0].jsonName
            ].forEach((array) => {
              i += array.length;
            });
            return i;
          } else {
            return changes[cam.Id][feature.type][feature.name][
              feature.parameters[0].jsonName
            ].length;
          }
        }
      } else {
        return 0;
      }
    });
  }, [cam, feature, changes]);

  //draw existing rect and save json
  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    if (
      index === feature.required_points &&
      array === feature.required_arrays &&
      points.length > 0
    ) {
      let copy = changes;
      if (index === 4) {
        let point_positions = Point_positions(points);
        drawRect(canvas, ctx, point_positions);
        copy[cam.Id][feature.type][feature.name][
          feature.parameters[0].jsonName
        ] = [
          { x: point_positions.topLeft.x, y: point_positions.topLeft.y },
          {
            x: point_positions.topRight.x,
            y: point_positions.topRight.y,
          },
          {
            x: point_positions.bottomRight.x,
            y: point_positions.bottomRight.y,
          },
          {
            x: point_positions.bottomLeft.x,
            y: point_positions.bottomLeft.y,
          },
        ];
      } else {
        copy[cam.Id][feature.type][feature.name][
          feature.parameters[0].jsonName
        ] = points;
        console.log(copy[cam.Id][feature.type][feature.name]);
        console.log(copy);
      }
      setChanges(copy);
    }
  }, [array, cam.Id, changes, feature, index, points, setChanges]);

  //reset index
  useEffect(() => {
    if (index === feature.required_points) {
      setIndex(0);
    }
  }, [index, feature.required_points]);

  const handleClick = (event) => {
    if (feature.canvas === true) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      let coords = getCoords(canvas);

      let x = event.pageX - coords.left;
      let y = event.pageY - coords.top;
      ctx.lineWidth = lineWidth;

      if (index % 2 === 0) {
        ctx.strokeStyle = colorArray[0];
      } else {
        ctx.strokeStyle = colorArray[1];
      }

      if (
        array < feature.required_arrays &&
        feature.required_points !== "unlimited"
      ) {
        if (index === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.moveTo(x, y);
          ctx.stroke();

          if (feature.required_arrays > 1) {
            let pointsCopy = points;
            pointsCopy[array].push({
              x: (x / canvas.width) * 100,
              y: (y / canvas.height) * 100,
            });
            setPoints(pointsCopy);
          } else {
            setPoints((points) => [
              ...points,
              {
                x: (x / canvas.width) * 100,
                y: (y / canvas.height) * 100,
              },
            ]);
          }

          setIndex((index) => index + 1);
        } else if (index === feature.required_points - 1) {
          ctx.lineTo(x, y);
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.stroke();

          if (feature.required_arrays > 1) {
            let pointsCopy = points;
            pointsCopy[array].push({
              x: (x / canvas.width) * 100,
              y: (y / canvas.height) * 100,
            });
            setPoints(pointsCopy);
          } else {
            setPoints((points) => [
              ...points,
              {
                x: (x / canvas.width) * 100,
                y: (y / canvas.height) * 100,
              },
            ]);
          }

          setIndex((index) => index + 1);
          setArray((arr) => arr + 1);
        } else if (index > 0 && index < feature.required_points - 1) {
          ctx.lineTo(x, y);
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(x, y);

          if (feature.required_arrays > 1) {
            let pointsCopy = points;
            pointsCopy[array].push({
              x: (x / canvas.width) * 100,
              y: (y / canvas.height) * 100,
            });
            setPoints(pointsCopy);
          } else {
            setPoints((points) => [
              ...points,
              {
                x: (x / canvas.width) * 100,
                y: (y / canvas.height) * 100,
              },
            ]);
          }

          setIndex((index) => index + 1);
        }
      } else if (feature.required_points === "unlimited") {
        if (index === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.moveTo(x, y);
          setLastPoints({ x, y });
          setPoints((points) => [
            ...points,
            {
              x: (x / canvas.width) * 100,
              y: (y / canvas.height) * 100,
            },
          ]);
        } else {
          ctx.lineTo(x, y);
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(x, y);

          setPoints((points) => [
            ...points,
            {
              x: (x / canvas.width) * 100,
              y: (y / canvas.height) * 100,
            },
          ]);
        }
        setIndex((index) => index + 1);
      }
    }
  };

  return (
    <div className="wrapper">
      <img className="image" alt="" src="" ref={imageRef} />
      <canvas
        style={
          feature.canvas === true
            ? { cursor: "crosshair" }
            : { cursor: "default" }
        }
        className="canvas"
        ref={canvasRef}
        onClick={(e) => handleClick(e)}
      ></canvas>
    </div>
  );
};

export default Canvas;

function b64toBlob(b64Data, contentType, sliceSize) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
