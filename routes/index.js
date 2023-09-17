var express = require("express");
var router = express.Router();
var sdk = require("@ory/client");

const ketoPermissions = new sdk.PermissionApi({
  basePath: process.env.ORY_KETO_URL, // replace with your Keto instance URL
});

var ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.ORY_KRATOS_URL,
  })
);

router.get("/", async function (req, res) {
  try {
    console.log(process.env.ORY_KRATOS_URL);
    const session = await ory.toSession({ cookie: req.header("cookie") });
    const permission = await ketoPermissions.checkPermission({
      namespace: "myapp",
      object: "general-page",
      relation: "owner",
      subjectId: `user:${session.data.identity.traits.email}`,
    });

    if (permission.data.allowed) {
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
    res.redirect(`${process.env.ORY_KRATOS_URL}/self-service/login/browser`);
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
