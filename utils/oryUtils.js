var sdk = require("@ory/client");
const {
  mainNamespace,
  mainRole,
  globalManagerObject,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");

const { KETO_READ_URL, KETO_WRITE_URL, KRATOS_URL } = process.env;

const readKeto = new sdk.PermissionApi({
  basePath: KETO_READ_URL,
});

const writeKeto = new sdk.PermissionApi({
  basePath: KETO_WRITE_URL,
});

const relationKeto = new sdk.RelationshipApi({
  basePath: KETO_WRITE_URL,
});

const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: KRATOS_URL,
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

async function getRelationships(queryParams) {
  return relationKeto.getRelationships({ ...queryParams });
}

class RelationshipHandler {
  constructor(namespace, object, role) {
    this.namespace = namespace;
    this.object = object;
    this.relation = role;
  }

  async create(sessionId) {
    return await relationKeto.createRelationship({
      createRelationshipBody: {
        namespace: this.namespace,
        object: this.object,
        relation: this.relation,
        subject_id: sessionId,
      },
    });
  }
}

module.exports = {
  RelationshipHandler,
  checkPermission,
  getSession,
  getUserPermissions,
  getRelationships,
};
