const mlfyr = require('mineflayer');
const notifier = require('node-notifier');

bot = mlfyr.createBot({
  host: '2b2t.org',
  auth: 'microsoft',
  version: '1.19.4'
});

const positionRegex = /Position in queue: (\d+)/;
let notisent = false;

function sendNotification(pos) {
  const notification = {
    title: "2b2t Queue!",
    message: `Position: ${pos}`,
    icon: './2b.png',
    sound: true
  };

  notifier.notify(notification, function(err, response) {
  });
};


bot.on('messagestr', (msg) => {
  const match = msg.match(positionRegex);
  
  if (match) {
    const position = match[1];
    console.log(`Position: ${position}`);


    if (position > 50 || notisent) return;
    notisent = true;
    sendNotification(position);
  }
});

bot.on('error', console.log);
bot.on('kicked', console.log);
bot.on('end', console.log);