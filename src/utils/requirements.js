export const requirements = {
  "Loitering Detection": {
    description:
      "This VA module detects loitering by monitoring cameras continuously " +
      "and alerts in real-time in the case of loitering within the monitored area " +
      "to be able to detect any threats and prevent any intrusion before it happens.",
    interval: {
      description:
        "The maximum allowed time interval in seconds where a " +
        "person is detected above which they are considered to be loitering.",
      lowerLimit: 10,
      upperLimit: 60,
    },
    threshold: {
      description:
        "The ratio of the actual displacement to the overall covered " +
        "distance that indicates displacement loitering.",
      lowerLimit: 0,
      upperLimit: 1,
    },
  },
  "Wrong Way Detection": {
    description:
      "This VA module detects people entering through an exit-only door. " +
      "For example, the system would allow people exiting a door, " +
      "but will raise an alarm in case a person tries to enter through that door. ",
    direction: {
      description:
        "The direction to be monitored, either clockwise (down/left) or " +
        "counterclockwise (up/right) with respect to the drawn line.",
    },
    points: {
      description:
        "Two points that make up the line that represents the gate or door.",
    },
  },
  "Vehicle Speed Estimation": {
    img: "vehiclespeed.jpg",
    description:
      "This VA module estimates in km/hr the speed of each vehicle detected by the vehicle detector.",
    points: {
      description:
        "A polygon of four points that has at least two parallel sides. The best practice of " +
        "specifying this Region Of Interest is to follow the orientation of the image plane " +
        "e.g. follow edge or lane lines when dealing with roads. Note that the speed will be " +
        "calculated exclusively inside this region.",
    },
    distance: {
      description:
        "The estimated distance between X and Y in meters." +
        "X → how you specify it in the UI e.g. A and B",
      lowerLimit: 1,
      upperLimit: 50,
    },
    cameraView: {
      description:
        "The view, either Top Down or Side, that is closer to the actual camera view.",
    },
  },
  "Proximity Detection": {
    img: "proximity.jpg",
    description:
      "This VA module detects breaches of social distancing rules, " +
      "providing live alarms and allowing staff to enforce distancing. ",
    distance: {
      description:
        "The maximum allowed distance in meters to be kept between individuals.",
      lowerLimit: 0.5,
      upperLimit: 3,
    },
    estimatedDistance: {
      description: "The estimated distance between A and B in meters.",
      lowerLimit: 1,
      upperLimit: 50,
    },
    points: {
      description:
        "A polygon of four points that should have at least two parallel sides. " +
        "The best practice of specifying this Region Of Interest is to follow the " +
        "orientation of the image plane e.g. follow edge or lane lines when dealing with roads.",
    },
  },
  "Perimeter Protection": {
    description:
      "This VA module detects potential intruders or " +
      "unauthorized persons entering a certain high security area.",
    polygons: {
      img: "",
      description:
        "A polygon of at least three points that represents the region of interest to be monitored.",
    },
  },
  "Tailgating Detection": {
    description:
      "This VA module detects that an authorized person allowed (intentionally or " +
      "unintentionally) others to follow them through a secure door that they have legitimately " +
      "accessed. ",
    interval: {
      description:
        "The interval of time in seconds after a person has entered a door below which " +
        "another person entering is considered to be tailgating.",
      lowerLimit: 1,
      upperLimit: 30,
    },
    direction: {
      description:
        "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
        "(up/right) with respect to the drawn line. ",
    },
    points: {
      description:
        "Two points that make up the line that represents the gate or door. ",
    },
  },
  "Personal Protective Equipment Detection": {
    description:
      "This VA module detects the compliance and non-compliance of workers in wearing personal " +
      "protective equipment in order to ensure worker safety by protecting them against health " +
      "and safety risks.",
  },
  "Congestion Detection": {
    description:
      "This VA module detects traffic jams on roadways, where if a set number of cars become " +
      "stationary, an alarm will be triggered. Additionally, a higher priority alarm is also " +
      "triggered when a higher number of cars are detected as stationery.",
    interval: {
      description:
        "The amount of time in seconds a car has to be detected for it to be considered stationary. ",
      lowerLimit: 5,
      upperLimit: 300,
    },
    firstAlarm: {
      description:
        "The number of stationery cars that triggers the first alarm.",
      lowerLimit: 5,
      upperLimit: 150,
    },
    secondAlarm: {
      description:
        "The number of stationery cars that triggers the second alarm.",
      lowerLimit: 10,
      upperLimit: 200,
    },
  },
  "Abandoned Luggage": {
    description:
      "This VA module detects luggage that has been unattended long enough " +
      "to be considered abandoned and thus a security threat.",
    interval: {
      description:
        "The interval of time in seconds where a luggage should be consecutively flagged " +
        "as unattended before being considered as abandoned.",
      lowerLimit: 30,
      upperLimit: 900,
    },
    radius: {
      description:
        "the radius around a luggage in which there has to be a person in order to " +
        "consider this luggage as attended.",
      lowerLimit: 5,
      upperLimitL: 50,
    },
  },
  "Face Mask Detection": {
    description: "This VA module detects face masks on detected individuals.",
  },
  "Gender Classification": {
    description:
      "This VA module classifies the gender of detected individuals. ",
  },
  "Clothes Detection": {
    description:
      "This VA module detects items of clothing worn by " +
      "detected individuals. It supports X items of clothing: ",
  },
  "Clothes Color Classification": {
    description:
      "This VA module classifies the color of the detected clothes. It supports 12 colors: black, " +
      "blue, brown, red, white, gray, dark gray, cyan, golden, green, purple, and yellow ",
  },
  "Vehicle Wrong Way Detection": {
    description:
      "This VA module detects vehicles going against traffic. For example, the system will raise " +
      "an alarm in case a vehicle goes against traffic on a one-way road. ",
    points: {
      description:
        "Two points that make up the line that represents the gate or door.",
    },
    direction: {
      description:
        "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
        "(up/right) with respect to the drawn line.",
    },
  },
  "Illegal Turn Detection": {
    img: "illegalturn.jpg",
    description:
      "This VA module identifies vehicles that have made an illegal turn.",
    points_1: {
      description:
        "Two points that make up the line that represents the first lane of the turn.",
    },
    points_2: {
      description:
        "Two points that make up the line that represents the second lane of the turn.",
    },
    direction_1: {
      description:
        "The direction to be monitored, either clockwise (down/left) or " +
        "counterclockwise (up/right) with respect to the first line. ",
    },
    direction_2: {
      description:
        "The direction to be monitored, either clockwise (down/left) or counterclockwise " +
        "(up/right) with respect to the second line. ",
    },
  },
  "Vehicle Type Classification": {
    description:
      "This VA module classifies the type of detected vehicles. It supports 7 " +
      "types: SUV, large sized bus, minibus, minivan, pickup truck, sedan and truck.",
  },
  "Vehicle Make Classification": {
    description:
      "This VA module classifies the make of detected vehicles. It supports 43 of " +
      "the most common makes: Audi, BMW, BYD, Buick, Cadillac, Cheryl, Chevrolet, Citroen, " +
      "Dodge, Ford, Forland times, Foton, GAC Motor, Higer, Honda, Hyundai, Infiniti, Iveco,  " +
      "JAC, Jaguar, Jeep, KIA, Karry,  Land Rover. Lexus, Lincoln, MG, MINI, Mazda, " +
      "Mercedes-Benz, Mitsubishi, Nissan, Peugeot, Porsche, Renault, SUNWIN, Skoda, " +
      "Smart, Subaru, Suzuki, Toyota, Volkswagen, and Volvo.",
  },
  "Vehicle Color Classification": {
    description:
      "This VA module classifies the color of detected vehicles. It supports 12 colors: black, " +
      "white, blue, gray, dark gray, red, brown, cyan, golden, green, purple, and yellow. ",
  },
  "Crowd Density Estimation": {
    description:
      "This VA module estimates the number of people in a crowd, in addition " +
      "to their distribution in the form of heatmaps.",
  },
};
