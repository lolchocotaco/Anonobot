import {get, post} from 'request-promise';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const SLACK_API_URL ='https://slack.com/api';
const defaultPayload = {
  username: 'anon',
  icon_emoji: ':ghost:'
}

export async function sendMessage(payload) {
  const options = {
    url: SLACK_WEBHOOK_URL,
    json: {...payload, ...defaultPayload}
  }
  console.log(options);
  return post(options);
}

export async function sendBotMessage(payload) {
  payload.token = process.env.BOT_TOKEN;

  const options = {
    url: `${SLACK_API_URL}/chat.postMessage`,
    formData: {...defaultPayload, ...payload},
    json: true
  }
  console.log(options);

  // Check if channel exists
  // const channelInfo = await get({
  //   url: `${SLACK_API_URL}/channels.info`,
  //   qs: {
  //     token: payload.token,
  //     channel: payload.channel
  //   },
  //   json: true
  // });
  // console.log(channelInfo);
  // if (!channelInfo.ok) throw 'Private channel! Invite: `/invite @anon-bot`'

  const result = await post(options);
  if (!result.ok) throw result.error;
}

export async function parseRequest(reqBody) {
  if (!reqBody || Object.keys(reqBody).length === 0 ) {
    throw 'Request is empty';
  }
  const {text, channel_id} = reqBody;
  if (!text || text.match(/^\s+$/) || text === 'help') {
    throw help();
  }

  return ({channel: channel_id, text });
}

/* TODO: Feature to send data to other channels RISKY business */
export async function parseRequest2(requestBody) {
  if (!requestBody || Object.keys(requestBody).length === 0 ) {
    throw 'Request is empty';
  }
  console.log(requestBody);
  const inputText = requestBody.text;

  if (!inputText || inputText === 'help') {
    throw help();
  }
  // text: [target] [text]
  const fragments = inputText.split(' ');
  if (fragments.length <= 1) {
    throw help()
  }
  const target = fragments[0];
  const text = fragments.slice(1).join(' ')

  if (target === ':here') {
    return ({channel: requestBody.channel_id, text});
  }

  return ({ channel: target, text });
}

function help() {
  const text = ' \
    Allows to send anonymous messages to users, channels and groups. \n \
    /anon [@user|#channel|group|:here] [message] \n \
  '
  return text;
}
