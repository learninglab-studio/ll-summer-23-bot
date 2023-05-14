const { App } = require('@slack/bolt');
require('dotenv').config()
const sshow = require('./src/the-bot/slashes/sshow')
const slog = require('./src/the-bot/slashes/slog')
const slaunchView = require('./src/the-bot/slashes/slaunch-view')
const handleSlaunchSubmission = require('./src/the-bot/slashes/slaunch-submission')
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN // add this
  });


app.message('test', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log('received a hi message')
    await say(`Hey there <@${message.user}>! I am not the do-your-work-bot.`);
});

app.command("/slaunch", slaunchView);
app.command("/slog", slog);
app.command('/sshow', sshow);

// app.view(/task_submission/, handleTaskViewSubmission);
app.view(/slaunch_submission/, handleSlaunchSubmission);
// app.view(/delegate_submission/, handleDelegateViewSubmission)

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();