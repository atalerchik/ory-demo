const express = require("express");
const router = express.Router();

const {
  mainNamespace,
  globalManagerObject,
  mainRole,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");
const {
  getSession,
  getRelationships,
  RelationshipHandler,
} = require("../utils/oryUtils");
const errorHandler = require("../utils/errorHandler");

// Utility function to create relationships
const createRelationAndRedirect = async (
  req,
  res,
  relationshipHandler,
  redirectPath
) => {
  try {
    const session = await getSession(req.header("cookie"));
    await relationshipHandler.create(session.data.identity.id);
    res.redirect(redirectPath);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

router.get("/global", async (req, res) => {
  const relationshipHandler = new RelationshipHandler(
    mainNamespace,
    globalManagerObject,
    mainRole
  );
  createRelationAndRedirect(req, res, relationshipHandler, "/routes");
});

router.get("/area", async (req, res) => {
  const relationshipHandler = new RelationshipHandler(
    mainNamespace,
    `${areaManagerObject}1`,
    mainRole
  );
  createRelationAndRedirect(
    req,
    res,
    relationshipHandler,
    "/routes/1"
  );
});

router.get("/route", async (req, res) => {
  const relationshipHandler = new RelationshipHandler(
    mainNamespace,
    `${routeManagerObject}1`,
    mainRole
  );
  createRelationAndRedirect(
    req,
    res,
    relationshipHandler,
    "/routes/1"
  );
});

router.get("/", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));

    const relations = await getRelationships({
      subjectId: session.data.identity.id,
    });

    res.status(200).json({
      sessionId: session.data.identity.id,
      relations: relations.data,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
