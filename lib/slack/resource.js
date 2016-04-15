import {Router} from 'express';
const router = new Router();
import {parseRequest, parseRequest2, sendMessage, sendBotMessage} from './';
export default router;

router.get('/', ( req, res, next) => {
  res.send('ok.')
});

// Token Validation
// req.body.token

/*
  req.body = {
    text: "hello"
    channel_id: ""
  }
*/
router.post('/v1', (req, res, next) => {
  parseRequest(req.body)
  .then(payload => sendMessage(payload))
  .then(() => res.status(200).send('Message sent! ;)'))
  .catch(e => {
    console.error('[SERVICE ERROR]', e);
    res.status(400).send(e);
  });
});

router.post('/v2', (req,res,next) => {
  parseRequest2(req.body)
  .then(payload => sendMessage(payload))
  .then(() => res.status(200).send('Message sent! ;)'))
  .catch(e => {
    console.error('[SERVICE ERROR]', e);
    res.status(400).send(e);
  });
});

router.post('/v3', (req, res, next) => {
  parseRequest2(req.body)
    .then(payload => sendBotMessage(payload))
    .then(() => res.status(200).send('Message sent! ;)'))
    .catch(e => {
      console.error('[SERVICE ERROR]', e);
      res.status(400).send(e);
    })
});
