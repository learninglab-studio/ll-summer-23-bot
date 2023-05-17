const { findRecordByValue, findRecordById, addRecord } = require('../../ll-modules/airtable-tools')
const { magenta, gray, yellow, blue, divider, red, darkgray } = require('../../ll-modules/utilities/ll-loggers')
const { Configuration, OpenAIApi } = require("openai");




module.exports = async ({ command, client, say, ack }) => {
    darkgray(`user ${command.user_id} has requested a new simagine 1\n${JSON.stringify(command, null, 4)}`)
    await ack()
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createImage({
        prompt: command.text,
        n: 1,
        size: "256x256",
      });
    yellow(response.data)
    const resulslackResultt = await client.chat.postMessage({
        channel: process.env.SLACK_SIMAGINE_CHANNEL,
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `response to */simagine* request from ${command.user_id}`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": command.text,
                    "emoji": true
                },
                "image_url": response.data.data[0].url,
                "alt_text": command.text
            }
        ]
    });
    //   const airtableResult = await addRecord({
    //     apiKey: process.env.AIRTABLE_API_KEY,
    //     baseId: process.env.AIRTABLE_SUMMER_23_BASE,
    //     table: "OpenAiImages",
    //     record: {
    //       Name: `${longTimestamp()}-${prompt}`,
    //       Json: JSON.stringify(data),
    //       ImageFile: [
    //         {
    //           "url": data.data[0].url
    //         }
    //       ],
    //       InitialImageUrl: data.data[0].url,
    //       Prompt: prompt
    //     }
    //   })
    
}
