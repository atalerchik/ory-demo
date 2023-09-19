const express = require("express");
const { getRoutes } = require("../data/routes");
const {
  getSession,
  getUserPermissions,
} = require("../utils/oryUtils");
const {
  globalManagerObject,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");
const { getRoute, getArea } = require("../utils/routeUtils");

const router = express.Router();

router.get("/:id", handleRouteRequest);
router.get("/", handleRouteRequest);

async function handleRouteRequest(req, res) {
  try {
    const session = await getSession(req.header("cookie"));
    const userId = session.data.identity.id;
    const id = req.params.id || 0;

    const routes = await getRoutes();
    const permissions = await getUserPermissions(userId, id);

    sendResponseBasedOnPermissions(res, permissions, routes, id);
  } catch (error) {
    console.error("Error handling route request:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

function sendResponseBasedOnPermissions(
  res,
  permissions,
  routes,
  areaId
) {
  if (permissions[globalManagerObject]) {
    return res.status(200).send({ routes });
  }

  if (permissions[`${areaManagerObject}${areaId}`]) {
    return res.status(200).send({ routes: getArea(routes, areaId) });
  }

  if (permissions[`${routeManagerObject}${areaId}`]) {
    const route = getRoute(routes, areaId);
    return res.status(200).send({ route: route });
  }

  return res.status(400).send({ message: "Bad request" });
}

module.exports = router;
