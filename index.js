const mlfyr = require('mineflayer');
const notifier = require('node-notifier');
const cfg = require('./config.json');

bot = mlfyr.createBot({
  host: cfg.serverSettings.host,
  port: cfg.serverSettings.port,
  auth: cfg.accountAuth,
  version: cfg.serverSettings.version,
  username: cfg.serverSettings.username
});

function reconnectToServer() {
  bot = mlfyr.createBot({
    host: cfg.serverSettings.host,
    port: cfg.serverSettings.port,
    auth: cfg.accountAuth,
    version: cfg.serverSettings.version,
    username: cfg.serverSettings.username
  });
};

const positionRegex = /Position in queue: (\d+)/;
let notisent = false;

function sendNotification(pos) {
  const notification = {
    title: "2b2t Queue!",
    message: `Position: ${pos}`,
    icon: './2b.png',
    sound: true
  };

  notifier.notify(notification, function(err, res) {
    if (!err || !cfg.errorLogging) return;
    console.log(`An Error Occurred Whilst Attempting To Send Notification: ${err}`);
  });
};


bot.on('messagestr', (msg) => {
  const match = msg.match(positionRegex);
  
  if (match) {
    const position = match[1];

    if (cfg.logging) {
      if (cfg.showNameNextToPos) { console.log(`Position: ${position} | ${bot.username}`) } else {
      console.log(`Position: ${position}`);
      }
    };

    if (position > cfg.desktopNotifications.threshold || notisent || !cfg.desktopNotifications.enabled) return;
    notisent = true;
    sendNotification(position);
  }
});

if (cfg.errorLogging) { bot.on('error', console.log); }
bot.on('kicked', console.log);
bot.on('end', console.log);

bot.on('error', () => {
  if (!cfg.reconnect.onError) return;
  reconnectToServer();
});

bot.on('kicked', () => {
  if (!cfg.reconnect.onKick) return;
  reconnectToServer();
});