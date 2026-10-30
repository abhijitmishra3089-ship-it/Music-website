module.exports = {
  apps: [{
    name: "dhun-api",
    script: "src/server.js",
    instances: 2,
    exec_mode: "cluster",
    autorestart: true,
    max_memory_restart: "500M",
    kill_timeout: 15000,
    env_production: { NODE_ENV: "production" }
  }]
};
