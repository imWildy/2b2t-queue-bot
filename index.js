const mlfyr = require('mineflayer');
const notifier = require('node-notifier');
const cfg = require('./config.json');


function connectToServer() {
  bot = mlfyr.createBot({
    host: cfg.serverSettings.host,
    port: cfg.serverSettings.port,
    auth: cfg.accountAuth,
    version: cfg.serverSettings.version,
    username: cfg.serverSettings.username
  });
};

connectToServer();

const positionRegex = /Position in queue: (\d+)/;
let notisent = false;
let oldPos = null;

function sendNotification(pos) {
  const notification = {
    title: "2b2t Queue!",
    message: `Position: ${pos}`,
    icon: './2b.png',
    sound: true
  };

  notifier.notify(notification, function(err, res) {
    if (!err) return;
    console.log(`An Error Occurred Whilst Attempting To Send Notification: ${err}`);
  });
};

bot.on('messagestr', (msg) => {
  const match = msg.match(positionRegex);
  
  if (match) {
    const position = match[1];

    if (cfg.onlyShowPosIfChanged) {
      if (oldPos === position) return;
    };

    oldPos = position;
    
    // Send The Message To Terminal
    if (cfg.logging) {
      if (cfg.showNameNextToPos) { console.log(`Position: ${position} | ${bot.username}`) } else {
      console.log(`Position: ${position}`);
      }
    };

    if (position > cfg.desktopNotifications.threshold || notisent || !cfg.desktopNotifications.enabled) return;
    notisent = true;
    sendNotification(position);
  } else {
    if (oldPos !== '1' || !cfg.antiAntiAFK) return; // Bypass Anti-AFK

    bot.setControlState('forward', true);
    bot.setControlState('jump', true);
    bot.setControlState('sprint', false);
  }
});

// Log Error And Kicks
bot.on('error', console.log);
bot.on('kicked', console.log);
bot.on('end', console.log);

// Attempt To Reconnect To Server On Error/Kick
bot.on('error', () => {
  if (!cfg.reconnect.onError) return;
  connectToServer();
});

bot.on('kicked', () => {
  if (!cfg.reconnect.onKick) return;
  connectToServer();
});

bot.on('end', () => {
  if (!cfg.reconnect.onEnd) return;
  connectToServer();
});