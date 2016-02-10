import {post} from 'request-promise';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const commonProps = {
  url: SLACK_WEBHOOK_URL,
};
const defaultPayload = {
  username: 'anon',
  icon_emoji: ':ghost:'
}

export async function sendMessage(payload) {
  const options = {
    ...commonProps,
    json: {...payload, ...defaultPayload}
  }
  console.log(options);
  return post(options);
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
