var sdk = require("@ory/client");
const {
  mainNamespace,
  mainRole,
  globalManagerObject,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");

const readKeto = new sdk.PermissionApi({
  basePath: process.env.KETO_READ_URL,
});

const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.KRATOS_URL,
  })
);

async function checkPermission(
  user_id,
  object,
  relation = mainRole,
  namespace = mainNamespace
) {
  const response = await readKeto.checkPermission({
    namespace: namespace,
    object,
    relation: relation,
    subjectId: `user:${user_id}`,
  });

  return response.data.allowed;
}
async function getSession(cookie) {
  return await ory.toSession({
    cookie,
  });
}

async function getUserPermissions(userId, areaId) {
  const rules = [
    globalManagerObject,
    `${areaManagerObject}${areaId}`,
    `${routeManagerObject}${areaId}`,
  ];

  try {
    const permissionResponses = await Promise.all(
      rules.map((rule) =>
        readKeto.checkPermission({
          namespace: mainNamespace,
          object: rule,
          relation: mainRole,
          subjectId: userId,
        })
      )
    );

    console.log(
      Object.fromEntries(
        permissionResponses.map((response, index) => [
          rules[index],
          response.data.allowed,
        ])
      )
    );

    return Object.fromEntries(
      permissionResponses.map((response, index) => [
        rules[index],
        response.data.allowed,
      ])
    );
  } catch (error) {
    console.error("Error getting permissions:", error);
    throw error;
  }
}

module.exports = {
  checkPermission,
  getSession,
  getUserPermissions,
};
