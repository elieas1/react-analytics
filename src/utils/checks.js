import { ai, human, vehicle } from "./variables";

export const human_checks = [
  {
    name: "Loitering Detection",
    parameters: [
      {
        name: "duration",
        lowerLimit: 5,
        upperLimit: 300,
      },
    ],
  },
  {
    name: "Wrong Way Detection",
    canvas: true,
    required_points: 2,
    required_arrays: 1,
    type: human,
    description:
      "This VA module detects people entering through an exit-only door. " +
      "For example, the system would allow people exiting a door, " +
      "but will raise an alarm in case a person tries to enter through that door. ",
    parameters: [
      {
        name: "Direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/right) or " +
          "counterclockwise (up/left) with respect to the drawn line.",
      },
      {
        name: "Region of Interest",
        type: "canvas",
        description:
          "Two points that make up the line that represents the gate or door.",
      },
    ],
  },
  {
    name: "Tailgating Detection",
    type: human,
    canvas: true,
    required_points: 2,
    required_arrays: 1,
    description:
      "This VA module detects that an authorized person allowed (intentionally or " +
      "unintentionally) others to follow them through a secure door that they have legitimately " +
      "accessed. ",
    parameters: [
      {
        name: "Direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/right) or " +
          "counterclockwise (up/left) with respect to the drawn line.",
      },
      {
        name: "Region of Interest",
        type: "canvas",
        description:
          "Two points that make up the line that represents the gate or door.",
        required_points: 2,
      },
      {
        name: "Time Interval",
        type: "range",
        lowerLimit: 1,
        upperLimit: 30,
        unit: "s",
        step: 1,
        description:
          "The interval of time in seconds after a person has entered a door below which " +
          "another person entering is considered to be tailgating.",
      },
    ],
  },

  {
    name: "Proximity Detection",
    type: human,
    required_points: 4,
    required_arrays: 1,
    canvas: true,
    description:
      "This VA module detects breaches of social distancing rules, " +
      "providing live alarms and allowing staff to enforce distancing. ",
    parameters: [
      {
        type: "range",
        name: "Estimated Distance",
        lowerLimit: 1,
        upperLimit: 50,
        step: 0.5,
        unit: "m",
        description: "The estimated distance between A and B in meters.",
      },
      {
        type: "range",
        name: "Maximum Allowed Distance",
        lowerLimit: 0.5,
        upperLimit: 3,
        step: 0.5,
        unit: "m",
        description:
          "The maximum allowed distance in meters to be kept between individuals.",
      },
      {
        name: "Region of Interest",
        type: "canvas",
        description:
          "A polygon of four points that should have at least two parallel sides. " +
          "The best practice of specifying this Region Of Interest is to follow the " +
          "orientation of the image plane e.g. follow edge or lane lines when dealing with roads.",
      },
    ],
  },
  {
    name: "Perimeter Protection",
    required_points: "unlimited",
    canvas: true,
    required_arrays: "unlimited",
    type: human,
    description:
      "This VA module detects potential intruders or " +
      "unauthorized persons entering a certain high security area.",
    parameters: [
      {
        name: "Region of Interest",
        type: "canvas",
        description:
          "A polygon of at least three points that represents the region of interest to be monitored.",
      },
    ],
  },
  {
    name: "Abandoned Luggage",
    type: human,
    description:
      "This VA module detects luggage that has been unattended long enough " +
      "to be considered abandoned and thus a security threat.",
    parameters: [
      {
        name: "Interval",
        description:
          "The interval of time in seconds where a luggage should be consecutively flagged " +
          "as unattended before being considered as abandoned.",
        lowerLimit: 30,
        upperLimit: 900,
        step: 1,
        unit: "s",
        type: "range",
      },
      {
        name: "Radius",
        description:
          "the radius around a luggage in which there has to be a person in order to " +
          "consider this luggage as attended.",
        lowerLimit: 5,
        upperLimit: 50,
        step: 1,
        unit: "%",
        type: "range",
      },
    ],
  },
  {
    name: "Crowd Density Estimation",
    type: human,
    description:
      "This VA module estimates the number of people in a crowd, in addition " +
      "to their distribution in the form of heatmaps.",
    parameters: [],
  },
];

export const vehicle_checks = [
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
        name: "Estimated Distance",
        type: "range",
        lowerLimit: 1,
        upperLimit: 50,
        step: 1,
        unit: "m",
        description:
          "The estimated distance between X and Y in meters." +
          "X → how you specify it in the UI e.g. A and B",
      },
      {
        name: "Region of Interest",
        type: "canvas",
        description:
          "A polygon of four points that has at least two parallel sides. The best practice of " +
          "specifying this Region Of Interest is to follow the orientation of the image plane " +
          "e.g. follow edge or lane lines when dealing with roads. Note that the speed will be " +
          "calculated exclusively inside this region.",
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
        name: "Direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
          "(up/right) with respect to the drawn line.",
      },
      {
        name: "Region of Interest",
        type: "canvas",
        required_points: 2,
        description:
          "Two points that make up the line that represents the gate or door.",
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
        name: "Direction 1",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or " +
          "counterclockwise (up/right) with respect to the first line. ",
      },
      {
        name: "Region of Interest",
        type: "canvas",
      },
      {
        name: "Direction 2",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
          "(up/right) with respect to the second line. ",
      },
    ],
  },
];

export const ai_checks = [
  {
    name: "Personal Protective Equipment Detection",
    type: ai,
    description:
      "This VA module detects the compliance and non-compliance of workers in wearing personal " +
      "protective equipment in order to ensure worker safety by protecting them against health " +
      "and safety risks.",
    parameters: [],
  },
  {
    name: "Face Mask Detection",
    type: ai,
    description: "This VA module detects face masks on detected individuals.",
    parameters: [],
  },
  {
    name: "Gender Classification",
    type: ai,
    description:
      "This VA module classifies the gender of detected individuals. ",
    parameters: [],
  },
  {
    name: "Clothes Detection",
    type: ai,
    description:
      "This VA module detects items of clothing worn by " +
      "detected individuals. It supports X items of clothing: ",
    parameters: [],
  },
  {
    name: "Clothes Color Classification",
    type: ai,
    description:
      "This VA module classifies the color of the detected clothes. It supports 12 colors: black, " +
      "blue, brown, red, white, gray, dark gray, cyan, golden, green, purple, and yellow ",
    parameters: [],
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