const {WebhookClient, EmbedBuilder } = require('discord.js');
const local = require('../../config/local.json');
const cfg = require('../../config/config.json');
const readline = require('readline');
const bot = require('../index');
const fs = require('fs');

console.log('[DEBUG] src/discord/discord.js executed');
const webhookUrl = local.webhookURL;
const regexPattern = /\/webhooks\/([^/]+)\/([^/]+)/;
const match = webhookUrl.match(regexPattern);

if (!match) { console.log('Invalid Webhook URL Format!'); return };

const id = match[1];
const token = match[2];

// Debug Logs (Won't be in release)
console.log('[DEBUG] ID:', id);
console.log('[DEBUG] Token:', token);


const webhook = new WebhookClient({ url: webhookUrl });

// Embed Configurations
const posEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#00FF00')
  .addFields({ name: 'Queue Threshold Hit', value: `Position: ${cfg.discord.positionThreshold}` })

const joinEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#00FF00')
  .addFields({ name: ' ', value: 'Joined Server' })

const errEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addFields({ name: 'Bot Disconnected!', value: 'Reason: `Error Occurred`' })

const kickEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addFields({ name: 'Bot Disconnected!', value: 'Reason: `Kicked`' })

const endEmbed = new EmbedBuilder()
  .setTitle('2b2t Queue')
  .setColor('#0000FF')
  .addFields({ name: 'Bot Disconnected!', value: 'Reason: `Bot Ended`' })


// Send Embeds
function thresholdHit() {
  console.log('[DEBUG] thresholdHit()');
  webhook.send({ embeds: [posEmbed] });
}

function spawned() {
  console.log('[DEBUG] spawned()');
  webhook.send({ embeds: [joinEmbed] });
}

function error() {
  console.log('[DEBUG] error()');
  webhook.send({ embeds: [errEmbed] });
}

function kick() {
  console.log('[DEBUG] kick()');
  webhook.send({ embeds: [kickEmbed] });
}

function end() {
  console.log('[DEBUG] end()');
  webhook.send({ embeds: [endEmbed] });
}

module.exports = {
  thresholdHit,
  spawned,
  error,
  kick,
  end
};