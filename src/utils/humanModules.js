import { ai, human } from "./variables";

export const humanModules = [
  {
    name: "Loitering Detection",
    type: human,
    description:
      "This VA module detects loitering by monitoring cameras continuously " +
      "and alerts in real-time in the case of loitering within the monitored area " +
      "to be able to detect any threats and prevent any intrusion before it happens.",
    parameters: [
      {
        type: "range",
        name: "Duration",
        jsonName: "duration",
        lowerLimit: 5,
        upperLimit: 300,
        unit: "s",
        step: 1,
        description:
          "the time threshold in seconds after which the person" +
          " moving around gets detected by the system as loitering",
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
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
        description:
          "Two points that make up the line that represents the gate or door.",
      },
      {
        name: "Direction",
        jsonName: "direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/right) or " +
          "counterclockwise (up/left) with respect to the drawn line.",
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
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
        description:
          "Two points that make up the line that represents the gate or door.",
        required_points: 2,
      },
      {
        name: "Direction",
        jsonName: "direction",
        type: "select",
        description:
          "The direction to be monitored, either clockwise (down/right) or " +
          "counterclockwise (up/left) with respect to the drawn line.",
      },
      {
        name: "Time Interval",
        jsonName: "interval",
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
        name: "Region of Interest",
        jsonName: "points",
        type: "canvas",
        description:
          "A polygon of four points that should have at least two parallel sides. " +
          "The best practice of specifying this Region Of Interest is to follow the " +
          "orientation of the image plane e.g. follow edge or lane lines when dealing with roads.",
      },
      {
        type: "range",
        name: "Estimated Distance",
        jsonName: "estimatedDistance",
        lowerLimit: 1,
        upperLimit: 50,
        step: 0.5,
        unit: "m",
        description: "The estimated distance between A and B in meters.",
      },
      {
        type: "range",
        name: "Maximum Allowed Distance",
        jsonName: "distance",
        lowerLimit: 0.5,
        upperLimit: 3,
        step: 0.5,
        unit: "m",
        description:
          "The maximum allowed distance in meters to be kept between individuals.",
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
        jsonName: "polygons",
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
        jsonName: "Interval",
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
        jsonName: "radius",
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
    name: "Crowd Density Estimation",
    type: human,
    description:
      "This VA module estimates the number of people in a crowd, in addition " +
      "to their distribution in the form of heatmaps.",
    parameters: [],
  },
];
