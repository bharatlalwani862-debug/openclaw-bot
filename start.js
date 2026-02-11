
const fs = require('fs');

const path = require('path');

const { execSync } = require('child_process');

// Create config

const homeDir = process.env.HOME || '/app';

const configDir = path.join(homeDir, '.openclaw');

if (!fs.existsSync(configDir)) {

  fs.mkdirSync(configDir, { recursive: true });

}

const config = {

  "meta": {

    "lastTouchedVersion": "2026.2.9",

    "lastTouchedAt": new Date().toISOString()

  },

  "auth": {

    "profiles": {

      "google": {

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

      "workspace": path.join(configDir, "workspace"),

      "maxConcurrent": 4

    }

  },

  "channels": {

    "telegram": {

      "enabled": true,

      "dmPolicy": "open",

      "allowFrom": ["*"]

      "botToken": process.env.TELEGRAM_BOT_TOKEN,

      "streamMode": "partial"

    }

  },

  "gateway": {

    "port": parseInt(process.env.PORT || process.env.OPENCLAW_GATEWAY_PORT || "10000"),

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

fs.writeFileSync(

  path.join(configDir, 'openclaw.json'),

  JSON.stringify(config, null, 2)

);

console.log('✅ Config created at:', path.join(configDir, 'openclaw.json'));

// Delete webhook first

const deleteWebhook = curl -s "https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteWebhook";

try {

  execSync(deleteWebhook);

  console.log('✅ Webhook deleted');

} catch(e) {

  console.log('⚠️  Webhook deletion failed (might be ok)');

}

// Start openclaw

console.log('🚀 Starting openclaw gateway...');

execSync('npx openclaw gateway start', { stdio: 'inherit' });

