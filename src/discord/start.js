const cfg = require('../../config/config.json');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

if (!cfg.discord.enabled) return;

let wbhkURL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.access(path.join(__dirname, '../../config/local.json'), err => {
  if (!err) {
    const { thresholdHit, spawned, error, kick, end } = require('./discord');
    module.exports = { thresholdHit, spawned, error, kick, end };
    return;
  };

  console.log(__dirname)
  rl.question('Enter Webhook URL: ', (url) => {
    wbhkURL = url;
    console.log(`[DEBUG] Webhook URL = ${url}`); // Debug Statement

    const data = {
        webhookURL: wbhkURL
      };
    
      const jsonData = JSON.stringify(data, null, 2);
    
      fs.writeFile(path.join(__dirname, '../../config/local.json'), jsonData, (err) => {
        if (err) throw err;
        console.log('[DEBUG] Wrote To File "local.json"!'); // Debug Statement

        const { thresholdHit, spawned, error, kick, end } = require('./discord');
        module.exports = { thresholdHit, spawned, error, kick, end };
      });
  });
});