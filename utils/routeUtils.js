function getRoute(routes, id) {
  for (let area of Object.values(routes)) {
    for (let route of area.routes) {
      console.log(route);
      if (route.id == id) {
        return route;
      }
    }
  }
}

function getArea(routes, id) {
  return routes[id];
}

module.exports = {
  getRoute,
  getArea,
};
