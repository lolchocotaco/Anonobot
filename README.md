# Anonobot

Note: Minimum requirement is Node v4.2.0

## Usage

Make some slack integrations and stuff.
### Slash command
* use endpoint `/v1` for the slash command
* `/v2` is risky and not tested. It actually doesn't exist. >_>

### Incoming Webhook
* Use webhook endpoint as `SLACK_WEBHOOK_URL` enviroment variable

### TODO
* Make it work with custom **SlackBots**  https://api.slack.com/methods/chat.postMessage
* Change usernames for every `[adj]-[noun]`
* Change emoji-con for every post
* Support Anon posting to other users/groups/channels. 

## License

[MIT](/LICENSE)
