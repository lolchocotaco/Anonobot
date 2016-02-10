import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import slack from './slack/resource';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/_health', (req, res) => res.end('ok'));
app.use('/favicon.ico', (req, res) => res.end());
app.use('/', slack);

const port = process.env.PORT;

app.listen(port, () => {
  console.log('✅ Server listening on: ' + port);
});
