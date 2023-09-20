const sdk = require("@ory/client");

// Extract environment variables and provide defaults if necessary
const {
  KETO_READ_URL = "",
  KETO_WRITE_URL = "",
  KRATOS_URL = "",
} = process.env;

// Configuration object to store base paths
const config = {
  readKeto: { basePath: KETO_READ_URL },
  writeKeto: { basePath: KETO_WRITE_URL },
  relationKeto: { basePath: KETO_READ_URL },
  writableRelationKeto: { basePath: KETO_WRITE_URL },
  frontendKeto: {
    basePath: KRATOS_URL,
  },
};

// Function to initialize APIs
const initializeApis = (sdk, config) => ({
  permissionApi: new sdk.PermissionApi(config.readKeto),
  writablePermissionApi: new sdk.PermissionApi(config.writeKeto),
  relationApi: new sdk.RelationshipApi(config.relationKeto),
  writableRelationApi: new sdk.RelationshipApi(
    config.writableRelationKeto
  ),
  frontendKeto: new sdk.FrontendApi(
    new sdk.Configuration(config.frontendKeto)
  ),
});

// Initialize APIs using the configuration object
const apis = initializeApis(sdk, config);

module.exports = apis;
