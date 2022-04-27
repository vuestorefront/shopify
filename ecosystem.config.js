module.exports = {
  apps: [
    {
      name: "Shopify-Beta-App",
      script: "yarn start",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "",
      instances: 1,
      autorestart: true,
      watch: true,
      maxMemoryRestart: "2G",
      env: {
        NODE_ENV: "development",
      },
      envProduction: {
        NODE_ENV: "production",
      },
    },
  ],
};

