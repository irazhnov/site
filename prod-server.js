require('dotenv').config();
const path = require('path');
const newrelic = require('newrelic');
const ejs = require('ejs');
const express = require('express');
const hsts = require('hsts');

const app = express();

const baseUrl = process.env.BASE_URL || 'https://soldr-test.aws.mmcloud.se';
const baseImageUrl = process.env.BASE_IMAGE_URL || 'https://mm-soldr-test.imgix.net/soldr/'

app.use(hsts({
  maxAge: 31536000,
  includeSubDomains: false,
  force: true,
}));


app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.locals.newrelic = newrelic;

app.use('/js', express.static('dist/js'));
app.use('/assets', express.static('dist/assets'));

app.get('/*', (req, res) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self' " + baseUrl + ";" +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'  https://bam.nr-data.net https://maps.googleapis.com https://d10lpsik1i8c69.cloudfront.net https://js-agent.newrelic.com https://settings.luckyorange.net https://geo.luckyorange.net https://cs.luckyorange.net https://ping.luckyorange.net https://www.luckyorange.com http://js.pusher.com https://stats.pusher.com;" +
    "style-src 'self' 'unsafe-inline' https://fonts.gstatic.com https://fonts.googleapis.com https://d10lpsik1i8c69.cloudfront.net https://cs.luckyorange.net;" +
    'font-src https://fonts.gstatic.com https://fonts.googleapis.com;' +
    'object-src https://cs.luckyorange.net;' +
    'media-src https://d10lpsik1i8c69.cloudfront.net;' +
    'connect-src ' + baseUrl + ' https://bam.nr-data.net *.luckyorange.net *.luckyorange.com wss://ws.pusherapp.com https://sockjs.pusher.com;' +
    "img-src 'self' https://csi.gstatic.com " + baseImageUrl + " https://maps.gstatic.com https://maps.googleapis.com https://d10lpsik1i8c69.cloudfront.net https://www.gravatar.com;" +
    'child-src http://snpwebstage001.mmk.mm.loc:3000 http://www.youtube.com https://mittmedia.solidtango.com https://d10lpsik1i8c69.cloudfront.net;');
  // TODO: add reporter uri (some BE endpoint for saving report messages of violating CSP)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.removeHeader('X-Powered-By');
  res.render('index.html');
});


app.port = process.env.PORT || 3000;


app.listen(app.port, () => {
  console.log(`listening on port ${app.port}`);
});
