const {WebhookClient, EmbedBuilder } = require('discord.js');
const cfg = require('../../config/config.json')
const readline = require('readline');
const bot = require('../index');
const fs = require('fs');

if (!cfg.discord.enabled) return;

let wbhkURL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


fs.access('../../local.json', err => {
  if (!err) return;

  rl.question('Enter Webhook URL: ', (url) => {
    wbhkURL = url;
    console.log(`[DEBUG] Webhook URL = ${url}`); // Debug Statement
  });

  const data = {
    webhookURL: wbhkURL
  };

  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile('../../config/local.json', jsonData, (err) => {
    if (err) throw err;
    console.log('[DEBUG] Wrote To File "local.json"!'); // Debug Statement
  });
});

const local = require('../../local.json');

const webhookUrl = local.webhookURL;
const regexPattern = /\/webhooks\/([^/]+)\/([^/]+)/;
const match = webhookUrl.match(regexPattern);

if (!match) { console.log('Invalid Webhook URL Format!'); return };

const id = match[1];
const token = match[2];

// Debug Logs (Won't be in release)
console.log(' [DEBUG] ID:', id);
console.log('[DEBUG] Token:', token);


const webhook = new WebhookClient(id, token);

// Embed Configurations
const posEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#00FF00')
  .addField('Queue Threshold Hit', `Position: ${cfg.discord.positionThreshold}`)
  .setFooter(bot.username);

const joinEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#00FF00')
  .addField(' ', 'Joined Server!')
  .setFooter(bot.username);

const errEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addField('Bot Disconnected!', 'Reason: `Error Occured`')
  .setFooter(bot.username);

const kickEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addField('Bot Disconnected!', 'Reason: `Kicked`')
  .setFooter(bot.username);

const endEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addField('Bot Disconnected!', 'Reason: `Bot Ended`')
  .setFooter(bot.username);


// Send Embeds
function thresholdHit() {
    webhook.send({ embeds: [posEmbed] })
};

function spawned() {
    webhook.send({ embeds: [joinEmbed] })
};


function error() {
    webhook.send({ embeds: [errEmbed] })
};

function kick() {
    webhook.send({ embeds: [kickEmbed] })
};

function end() {
    webhook.send({ embeds: [endEmbed] })
};

module.exports = thresholdHit, spawned, error, kick, end;