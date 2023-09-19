var express = require("express");
var router = express.Router();
var sdk = require("@ory/client");
const { checkPermission, getSession } = require("../utils/oryUtils");

var ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.KRATOS_URL,
  })
);

router.get("/", async function (req, res) {
  try {
    const session = await getSession(req.header("cookie"));

    const userEmail = session.data.identity.traits.email;
    const permission = await checkPermission(
      userEmail,
      "general-page",
      "owner",
      "myapp"
    );

    if (permission) {
      res.render("index", {
        title: "You have permission",
        identity: session.data.identity,
      });
      return;
    }

    res.render("index", {
      title: "You don't have permission",
      identity: session.data.identity,
    });
  } catch (error) {
    console.error(error);
    res.redirect(
      `${process.env.KRATOS_URL}/self-service/login/browser`
    );
  }
});

router.get("/admin", async (req, res) => {
  try {
    const session = await getSession(req.header("cookie"));
    const permission = await checkPermission(
      userEmail,
      "general-page",
      "owner",
      "myapp"
    );
    if (permission) {
      throw new Error();
    }

    res.render("index", {
      title: "You owner of this page",
      identity: session.data.identity,
    });
  } catch (error) {
    res.status(403).send({ message: "Permission denide" });
  }
});

router.get("/logout", (req, res) => {
  ory
    .createBrowserLogoutFlow({ cookie: req.header("cookie") })
    .then(({ data }) => {
      res.redirect(data.logout_url);
    });
});

module.exports = router;
