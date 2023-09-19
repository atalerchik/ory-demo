const routes = {
  1: {
    areaInfo: {
      areaName: "Eastern Europe",
      popularDestinations: ["Minsk", "Vilnius", "Warsaw"],
      timezone: "EET",
    },
    routes: [
      {
        id: 1,
        routeName: "Route 1",
        shoulders: ["Minsk - Vilnius", "Vilnius - Warsaw"],
        operator: "Eastern European Buses",
        frequency: "Every 4 hours",
        busStops: [
          "Minsk Central",
          "Vilnius Central",
          "Warsaw Central",
        ],
      },
      {
        id: 2,
        routeName: "Route 10",
        shoulders: ["Minsk - Vilnius", "Vilnius - Warsaw"],
        operator: "Eastern European Buses",
        frequency: "Every 2 hours",
        busStops: [
          "Minsk Central",
          "Vilnius Central",
          "Warsaw Central",
        ],
      },
    ],
  },
  2: {
    areaInfo: {
      areaName: "Northern Germany and Denmark",
      popularDestinations: ["Berlin", "Hamburg", "Copenhagen"],
      timezone: "CET",
    },
    routes: [
      {
        id: 3,
        routeName: "Route 2",
        shoulders: ["Berlin - Hamburg", "Hamburg - Copenhagen"],
        operator: "Nordic Lines",
        frequency: "Every 3 hours",
        busStops: [
          "Berlin Central",
          "Hamburg Central",
          "Copenhagen Central",
        ],
      },
    ],
  },
  3: {
    areaInfo: {
      areaName: "Western Europe",
      popularDestinations: ["Paris", "Brussels", "Amsterdam"],
      timezone: "CET",
    },
    routes: [
      {
        id: 5,
        routeName: "Route 3",
        shoulders: ["Paris - Brussels", "Brussels - Amsterdam"],
        operator: "Western Euro Travels",
        frequency: "Every 2 hours",
        busStops: [
          "Paris Central",
          "Brussels Central",
          "Amsterdam Central",
        ],
      },
    ],
  },
};

async function getRoutes(premissions) {
  return routes;
}

module.exports = { getRoutes };
