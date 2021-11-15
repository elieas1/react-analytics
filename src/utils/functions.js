import { ai, human, lineWidth, vehicle } from "../utils/variables";
import { ai_checks, human_checks, vehicle_checks } from "./checks";

export const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  let body = document.body;
  let docEl = document.documentElement;

  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  let clientTop = docEl.clientTop || body.clientTop || 0;
  let clientLeft = docEl.clientLeft || body.clientLeft || 0;

  let top = box.top + scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

export const drawRect = (canvas, ctx, point_positions) => {
  const colorArray = ["#0000ff", "#ffff00"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorArray[0];
  ctx.beginPath();
  ctx.arc(
    (point_positions.topLeft.x / 100) * canvas.width,
    (point_positions.topLeft.y / 100) * canvas.height,
    3,
    0,
    2 * Math.PI
  );
  ctx.moveTo(
    (point_positions.topLeft.x / 100) * canvas.width,
    (point_positions.topLeft.y / 100) * canvas.height
  );

  ctx.lineTo(
    (point_positions.topRight.x / 100) * canvas.width,
    (point_positions.topRight.y / 100) * canvas.height
  );
  ctx.arc(
    (point_positions.topRight.x / 100) * canvas.width,
    (point_positions.topRight.y / 100) * canvas.height,
    3,
    0,
    2 * Math.PI
  );

  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorArray[1];

  ctx.moveTo(
    (point_positions.topRight.x / 100) * canvas.width,
    (point_positions.topRight.y / 100) * canvas.height
  );

  ctx.lineTo(
    (point_positions.bottomRight.x / 100) * canvas.width,
    (point_positions.bottomRight.y / 100) * canvas.height
  );

  ctx.arc(
    (point_positions.bottomRight.x / 100) * canvas.width,
    (point_positions.bottomRight.y / 100) * canvas.height,
    3,
    0,
    2 * Math.PI
  );

  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorArray[0];

  ctx.moveTo(
    (point_positions.bottomRight.x / 100) * canvas.width,
    (point_positions.bottomRight.y / 100) * canvas.height
  );

  ctx.lineTo(
    (point_positions.bottomLeft.x / 100) * canvas.width,
    (point_positions.bottomLeft.y / 100) * canvas.height
  );

  ctx.arc(
    (point_positions.bottomLeft.x / 100) * canvas.width,
    (point_positions.bottomLeft.y / 100) * canvas.height,
    3,
    0,
    2 * Math.PI
  );

  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorArray[1];

  ctx.moveTo(
    (point_positions.bottomLeft.x / 100) * canvas.width,
    (point_positions.bottomLeft.y / 100) * canvas.height
  );

  ctx.lineTo(
    (point_positions.topLeft.x / 100) * canvas.width,
    (point_positions.topLeft.y / 100) * canvas.height
  );

  ctx.closePath();
  ctx.stroke();

  ctx.font = "25px Times New Roman";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "yellow";
  ctx.strokeText(
    "A",
    ((point_positions.topLeft.x + 3) / 100) * canvas.width,
    ((point_positions.topLeft.y + 6) / 100) * canvas.height
  );
  ctx.strokeText(
    "B",
    ((point_positions.topRight.x - 6) / 100) * canvas.width,
    ((point_positions.topRight.y + 6) / 100) * canvas.height
  );
};

export const drawExisting = (json_variable, canvas, ctx) => {
  const colorArray = ["#0000ff", "#ffff00"];
  ctx.lineWidth = lineWidth;

  if (Array.isArray(json_variable[0])) {
    json_variable.forEach((arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
          ctx.strokeStyle = colorArray[0];
        } else {
          ctx.strokeStyle = colorArray[1];
        }
        ctx.beginPath();
        ctx.arc(
          (arr[i].x / 100) * canvas.width,
          (arr[i].y / 100) * canvas.height,
          3,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.moveTo(
          (arr[i].x / 100) * canvas.width,
          (arr[i].y / 100) * canvas.height
        );

        if (typeof arr[i + 1] === "undefined") {
          ctx.lineTo(
            (arr[0].x / 100) * canvas.width,
            (arr[0].y / 100) * canvas.height
          );
        } else {
          ctx.lineTo(
            (arr[i + 1].x / 100) * canvas.width,
            (arr[i + 1].y / 100) * canvas.height
          );
        }
        ctx.closePath();
        ctx.stroke();
      }
    });
  } else {
    if (json_variable.length === 4) {
      let point_positions = Point_positions(json_variable);
      drawRect(canvas, ctx, point_positions);
    } else {
      ctx.strokeStyle = colorArray[0];
      console.log(ctx.strokeStyle);
      ctx.beginPath();
      ctx.arc(
        (json_variable[0].x / 100) * canvas.width,
        (json_variable[0].y / 100) * canvas.height,
        3,
        0,
        2 * Math.PI
      );

      ctx.stroke();
      ctx.moveTo(
        (json_variable[0].x / 100) * canvas.width,
        (json_variable[0].y / 100) * canvas.height
      );

      for (let i = 1; i < json_variable.length; i++) {
        ctx.lineTo(
          (json_variable[i].x / 100) * canvas.width,
          (json_variable[i].y / 100) * canvas.height
        );
        ctx.arc(
          (json_variable[i].x / 100) * canvas.width,
          (json_variable[i].y / 100) * canvas.height,
          3,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }

      ctx.closePath();
    }
  }
};

export const Point_positions = (points) => {
  let point1;
  let point2;
  let points_remaining;

  const minY = Math.min(points[0].y, points[1].y, points[2].y, points[3].y);

  let extracted_points = points.filter((obj) => {
    return obj.y === minY;
  });

  if (extracted_points.length === 1) {
    point1 = extracted_points[0];
    points_remaining = points.filter((point) => {
      return point.y !== minY;
    });
    const minY2 = Math.min(
      points_remaining[0].y,
      points_remaining[1].y,
      points_remaining[2].y
    );
    point2 = points_remaining.filter((obj) => {
      return obj.y === minY2;
    })[0];
    points_remaining = points_remaining.filter((point) => {
      return point.y !== minY2;
    });
  } else if (extracted_points.length === 2) {
    // A straight line is drawn
    point1 = extracted_points[0];
    point2 = extracted_points[1];
    points_remaining = points.filter((point) => {
      return point.y !== minY;
    });
  } else {
    points_remaining = [];
  }

  if (points_remaining.length !== 2) {
    return {};
  }

  const arr = [];
  arr.push(point1, point2);

  let x = Math.min(arr[0].x, arr[1].x);
  const topLeft = arr.filter((obj) => {
    return obj.x === x;
  })[0];

  const topRight = arr.filter((obj) => {
    return obj.x !== x;
  })[0];

  let x2 = Math.min(points_remaining[0].x, points_remaining[1].x);
  const bottomLeft = points_remaining.filter((obj) => {
    return obj.x === x2;
  })[0];

  const bottomRight = points_remaining.filter((obj) => {
    return obj.x !== x2;
  })[0];

  return { topLeft, topRight, bottomLeft, bottomRight };
};

export const Check_requirements = (changes) => {
  //loop over each camera in json object
  for (const [ChangesKey] of Object.entries(changes)) {
    //loop over haman_checks object values
    for (const [, HumanValue] of Object.entries(human_checks)) {
      //check if feature name is not found
      if (!changes[ChangesKey][human].hasOwnProperty(HumanValue.name)) {
        console.log("error");
      } else {
        if (changes[ChangesKey][human][HumanValue.name].enabled === true) {
          //feature name is found
          //loop over feature parameters
          for (const [, ParameterValue] of Object.entries(
            HumanValue.parameters
          )) {
            //check if feature parameters are found
            if (
              !changes[ChangesKey][human][HumanValue.name].hasOwnProperty(
                ParameterValue.name
              )
            ) {
              //parameter is missing
              console.log("error found");
            }
          }
        }
      }
    }
    for (const [, VehicleValue] of Object.entries(vehicle_checks)) {
      if (!changes[ChangesKey][vehicle].hasOwnProperty(VehicleValue.name)) {
        console.log("error");
      } else {
        if (changes[ChangesKey][vehicle][VehicleValue.name].enabled === true) {
          //feature name is found
          //loop over feature parameters
          for (const [, ParameterValue] of Object.entries(
            VehicleValue.parameters
          )) {
            //check if feature parameters are found
            if (
              !changes[ChangesKey][vehicle][VehicleValue.name].hasOwnProperty(
                ParameterValue.name
              )
            ) {
              //parameter is missing
              console.log(
                changes[ChangesKey][vehicle][VehicleValue.name],
                ParameterValue.name
              );
            }
          }
        }
      }
    }
    for (const [, AIValue] of Object.entries(ai_checks)) {
      if (!changes[ChangesKey][ai].hasOwnProperty(AIValue.name)) {
        
      }
    }
  }
  console.log(ai_checks);
};
