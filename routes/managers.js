var express = require("express");
var router = express.Router();
var sdk = require("@ory/client");
const {
  mainNamespace,
  globalManagerObject,
  mainRole,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");
const { getSession } = require("../utils/oryUtils");

const writeKeto = new sdk.RelationshipApi({
  basePath: process.env.KETO_WRITE_URL,
});

const readKeto = new sdk.RelationshipApi({
  basePath: process.env.KETO_READ_URL,
});

router.get("/global", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));

    await writeKeto.createRelationship({
      createRelationshipBody: {
        namespace: mainNamespace,
        object: globalManagerObject,
        relation: mainRole,
        subject_id: session.data.identity.id,
      },
    });
    res.redirect("/routes");
  } catch (error) {
    console.error(error);
    res.redirect(
      `${process.env.KRATOS_URL}/self-service/login/browser`
    );
  }
});

router.get("/area", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));

    await writeKeto.createRelationship({
      createRelationshipBody: {
        namespace: mainNamespace,
        object: `${areaManagerObject}1`,
        relation: mainRole,
        subject_id: session.data.identity.id,
      },
    });
    res.redirect("/routes/1");
  } catch (error) {
    console.error(error);
    res.redirect(
      `${process.env.KRATOS_URL}/self-service/login/browser`
    );
  }
});

router.get("/route", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));

    await writeKeto.createRelationship({
      createRelationshipBody: {
        namespace: mainNamespace,
        object: `${routeManagerObject}1`,
        relation: mainRole,
        subject_id: session.data.identity.id,
      },
    });

    res.redirect("/routes/1");
  } catch (error) {
    console.error(error);
    res.redirect(
      `${process.env.KRATOS_URL}/self-service/login/browser`
    );
  }
});

router.get("/", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));

    const relations = await readKeto.getRelationships({
      subjectId: session.data.identity.id,
    });

    res.status(200).send({
      sessionId: session.data.identity.id,
      relations: relations.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
