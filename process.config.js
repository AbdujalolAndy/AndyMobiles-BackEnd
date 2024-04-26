module.exports = {
  apps: [
    {
      name: "andymobile",
      watch: true,
      cwd: "./",
      script: "./server.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
