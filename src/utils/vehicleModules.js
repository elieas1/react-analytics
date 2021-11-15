import { ai, vehicle } from "./variables";

export const vehicleModules = [
  {
    name: "Vehicle Speed Estimation",
    type: vehicle,
    canvas: true,
    required_points: 4,
    required_arrays: 1,
    description:
      "This VA module estimates in km/hr the speed of each vehicle detected by the vehicle detector.",
    parameters: [
      {
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
        description:
          "A polygon of four points that has at least two parallel sides. The best practice of " +
          "specifying this Region Of Interest is to follow the orientation of the image plane " +
          "e.g. follow edge or lane lines when dealing with roads. Note that the speed will be " +
          "calculated exclusively inside this region.",
      },
      {
        name: "Estimated Distance",
        jsonName: "distance",
        type: "range",
        lowerLimit: 1,
        upperLimit: 50,
        step: 1,
        unit: "m",
        description:
          "The estimated distance between X and Y in meters." +
          "X → how you specify it in the UI e.g. A and B",
      },
    ],
  },
  {
    name: "Congestion Detection",
    type: vehicle,
    description:
      "This VA module detects traffic jams on roadways, where if a set number of cars become " +
      "stationary, an alarm will be triggered. Additionally, a higher priority alarm is also " +
      "triggered when a higher number of cars are detected as stationery.",
    parameters: [
      {
        name: "Time Interval",
        jsonName: "interval",
        type: "range",
        lowerLimit: 5,
        upperLimit: 300,
        unit: "s",
        step: 1,
        description:
          "The amount of time in seconds a car has to be detected for it to be considered stationary.",
      },
      {
        name: "First Alarm Threshold",
        jsonName: "firstAlarm",
        type: "range",
        lowerLimit: 5,
        upperLimit: 150,
        unit: "",
        step: 1,
        description:
          "The number of stationary cars that triggers the first alarm.",
      },
      {
        name: "Second Alarm Threshold",
        jsonName: "secondAlarm",
        type: "range",
        lowerLimit: 10,
        upperLimit: 200,
        description:
          "The number of stationary cars that triggers the second alarm.",
        step: 1,
        unit: "",
      },
    ],
  },
  {
    name: "Wrong Way Detection",
    type: vehicle,
    canvas: true,
    required_points: 2,
    required_arrays: 1,
    description:
      "This VA module detects vehicles going against traffic. For example, the system will raise " +
      "an alarm in case a vehicle goes against traffic on a one-way road. ",
    parameters: [
      {
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
        required_points: 2,
        description:
          "Two points that make up the line that represents the gate or door.",
      },
      {
        name: "Direction",
        jsonName: "direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
          "(up/right) with respect to the drawn line.",
      },
    ],
  },
  {
    name: "Illegal Turn Detection",
    type: vehicle,
    canvas: true,
    required_points: 2,
    required_arrays: 2,
    description:
      "This VA module identifies vehicles that have made an illegal turn.",
    parameters: [
      {
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
      },
      {
        name: "Direction 1",
        jsonName: "direction_1",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or " +
          "counterclockwise (up/right) with respect to the first line. ",
      },
      {
        name: "Direction 2",
        jsonName: "direction_2",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
          "(up/right) with respect to the second line. ",
      },
    ],
  },
  {
    name: "Vehicle Type Classification",
    type: ai,
    description:
      "This VA module classifies the type of detected vehicles. It supports 7 " +
      "types: SUV, large sized bus, minibus, minivan, pickup truck, sedan and truck.",
    parameters: [],
  },
  {
    name: "Vehicle Make Classification",
    type: ai,
    description:
      "This VA module classifies the make of detected vehicles. It supports 43 of " +
      "the most common makes: Audi, BMW, BYD, Buick, Cadillac, Cheryl, Chevrolet, Citroen, " +
      "Dodge, Ford, Forland times, Foton, GAC Motor, Higer, Honda, Hyundai, Infiniti, Iveco,  " +
      "JAC, Jaguar, Jeep, KIA, Karry,  Land Rover. Lexus, Lincoln, MG, MINI, Mazda, " +
      "Mercedes-Benz, Mitsubishi, Nissan, Peugeot, Porsche, Renault, SUNWIN, Skoda, " +
      "Smart, Subaru, Suzuki, Toyota, Volkswagen, and Volvo.",
    parameters: [],
  },
  {
    name: "Vehicle Color Classification",
    type: ai,
    description:
      "This VA module classifies the color of detected vehicles. It supports 12 colors: black, " +
      "white, blue, gray, dark gray, red, brown, cyan, golden, green, purple, and yellow. ",
    parameters: [],
  },
];
