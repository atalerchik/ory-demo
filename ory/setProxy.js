const { exec } = require("child_process");

  console.log(`ory proxy --dev --project ${process.env.ORY_PROJECT_SLUG} --no-jwt --port 4000 http://${process.env.SERVER_IP}:3000/`)
exec(
  `ory proxy --dev --project ${process.env.ORY_PROJECT_SLUG} --no-jwt --port 4000 http://${process.env.SERVER_IP}:3000/`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing proxy command: ${error}`);
      return;
    }

    console.log(`Proxy command executed successfully: ${stdout}`);
  }
);
