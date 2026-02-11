const fs = require('fs');
const path = require('path');

const config = {
  "meta": {
    "lastTouchedVersion": "2026.2.9",
    "lastTouchedAt": new Date().toISOString()
  },
  "auth": {
    "profiles": {
      "google:default": {
        "provider": "google",
        "mode": "api_key",
        "key": process.env.GOOGLE_API_KEY
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "google/gemini-3-flash-preview"
      },
      "workspace": "/app/.openclaw/workspace",
      "maxConcurrent": 4
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "botToken": process.env.TELEGRAM_BOT_TOKEN,
      "allowFrom": [],
      "streamMode": "partial"
    }
  },
  "gateway": {
    "port": parseInt(process.env.OPENCLAW_GATEWAY_PORT || "10000"),
    "mode": "local",
    "bind": "0.0.0.0"
  },
  "tools": {
    "web": {
      "fetch": {
        "enabled": true
      }
    }
  }
};

const configDir = path.join(process.env.HOME || '/app', '.openclaw');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

fs.writeFileSync(
  path.join(configDir, 'openclaw.json'),
  JSON.stringify(config, null, 2)
);

console.log('Config created successfully!');
