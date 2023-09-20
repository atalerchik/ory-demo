const {
  mainNamespace,
  mainRole,
  globalManagerObject,
  areaManagerObject,
  routeManagerObject,
} = require("../constants");
const {
  frontendKeto,
  permissionApi,
  relationApi,
  writableRelationApi,
} = require("../libs/ory");

async function checkPermission(
  user_id,
  object,
  relation = mainRole,
  namespace = mainNamespace
) {
  const response = await permissionApi.checkPermission({
    namespace: namespace,
    object,
    relation: relation,
    subjectId: `user:${user_id}`,
  });

  return response.data.allowed;
}
async function getSession(cookie) {
  return await frontendKeto.toSession({
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
        permissionApi.checkPermission({
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
  return relationApi.getRelationships({ ...queryParams });
}

class RelationshipHandler {
  constructor(namespace, object, role) {
    this.namespace = namespace;
    this.object = object;
    this.relation = role;
  }

  async create(sessionId) {
    return await writableRelationApi.createRelationship({
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
