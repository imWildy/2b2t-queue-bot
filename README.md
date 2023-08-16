<div align="center">

# 2b2t Queue Bot

<p><h4>A bot to help you AFK in 2b2t queue if you are too poor to buy priority.</h4></p>

<img src="https://i.e-z.host/gn8g5q4k.png" alt="Application Preview">
</div>

## How To Use

- Clone This Repository and then run `npm install` to install all the neccessary dependencies required for the bot.
- After the installation has finished, run `node .`
    * <i>If the command does not work, <u>[download node.js](https://nodejs.org/en/download)</u></i>
- Link your microsoft account and then the script should automatically start running and show your current queue position

## How To Join 2b2t

When you want to join 2b2t and not lose your queue position, you need to end the script just before you join 2b2t.
You should join 2b2t in a max of a couple seconds after you exit the script.
<h5>If done too slow then you will be sent to the back of the queue and will need to wait again!</h5>

## Config System

Configs are saved in the `config.json` file, to change configuration settings, edit values inside of the file.

- Account Authorization should be either `microsoft` or `offline` (only use offline mode is the server is cracked!)
- The `username` field only works if `offline` mode is enabled in the account athorization.

## Queue Bot Progress

- [x] Bot that joins 2b2t
- [x] Show user queue position
- [x] A config system
- [ ] Show user Estimated Time to join
- [ ] An Express App to increase User Experience


<h4>This project is still needs lots of work, I would appreciate if you submit a pull request or report issues in [GitHub Issues](https://github.com/imWildy/2b2t-queue-bot/issues).</h4>