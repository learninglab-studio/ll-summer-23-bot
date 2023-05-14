// const { findRecordByValue, findRecordById, addRecord } = require('../../ll-modules/airtable-tools')
const { magenta, gray, yellow, blue, divider, red, darkgray } = require('../../ll-modules/utilities/ll-loggers')


module.exports = async ({ command, client, say, ack }) => {
    await ack()
    darkgray(`user ${command.user_id} has requested a new slaunch 1\n${JSON.stringify(command, null, 4)}`)
    const theView = await createView({
        user: command.user_id, 
        trigger_id: command.trigger_id,
        commandText: command.text
    })
    try {
        const result = await client.views.open(theView);
    } catch (error) {
        red(error)
    }
}

const createView = ({ user, trigger_id, commandText }) => {    
    const theView = {
        trigger_id: trigger_id,
        view: {
          type: 'modal',
          callback_id: 'slaunch_submission',
          title: {
            type: 'plain_text',
            text: 'slaunch'
          },
          "blocks": [
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "project_title_input",
                    "initial_value": commandText.substring(0, 53)               
                },
                "label": {
                    "type": "plain_text",
                    "text": "Title",
                    "emoji": true
                },
                "block_id": "project_title"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "project_description_input",
                    "initial_value": commandText
                },
                "label": {
                    "type": "plain_text",
                    "text": "Description",
                    "emoji": true
                },
                "block_id": "project_description"
            },
            {
                "type": "input",
                "element": {
                    "type": "radio_buttons",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "summer project",
                                "emoji": true
                            },
                            "value": "Summer Project"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "lookbook",
                                "emoji": true
                            },
                            "value": "Lookbook"
                        },
                        {
                          "text": {
                              "type": "plain_text",
                              "text": "writing",
                              "emoji": true
                          },
                          "value": "Writing"
                      },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "feature request",
                                "emoji": true
                            },
                            "value": "Feature Request"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "writing",
                                "emoji": true
                            },
                            "value": "Resource"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "single-action",
                                "emoji": true
                            },
                            "value": "Single Action Item"
                        }
                    ],
                    "action_id": "project_type_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Type?",
                    "emoji": true
                },
                "block_id": "project_type"
            },
            {
                "type": "input",
                "element": {
                    "type": "multi_users_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Assigned To?",
                        "emoji": true
                    },
                    "action_id": "assignedto_input",
                    "initial_users": user ? [user] : []
                },
                "label": {
                    "type": "plain_text",
                    "text": "Assigned To?",
                    "emoji": true
                },
                "block_id": "assignedto"
            }
        ],
        submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      }
      return theView
}