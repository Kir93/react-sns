const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const pord = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );
  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', {
      tag: decodeURIComponent(req.params.tag),
    });
  });
  server.get('/user/:id/posts', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(3060, () => {
    console.log('next+express is running on http://58.236.217.124:3060');
  });
});
