require('dotenv').config();
const path = require('path');
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


app.set('views', path.join(__dirname, 'www'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.locals.newrelic = newrelic;

app.use('/js', express.static('www/js'));
app.use('/assets', express.static('www/assets'));

app.get('/*', (req, res) => {
//   res.setHeader('Content-Security-Policy',
//     "default-src 'self' " + baseUrl + ";" +
//     "script-src 'self' 'unsafe-eval' 'unsafe-inline'" +
//     "style-src 'self' 'unsafe-inline' https://fonts.gstatic.com https://fonts.googleapis.com https://d10lpsik1i8c69.cloudfront.net" +
//     'font-src https://fonts.gstatic.com https://fonts.googleapis.com;' +
//     'connect-src ' + baseUrl +
//     "img-src 'self' https://csi.gstatic.com " + baseImageUrl +
//     'child-src ');
  // TODO: add reporter uri (some BE endpoint for saving report messages of violating CSP)
//   res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//   res.setHeader('X-XSS-Protection', '1');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.removeHeader('X-Powered-By');
  res.render('index.html');
});


app.port = process.env.PORT || 3000;


app.listen(app.port, () => {
  console.log(`listening on port ${app.port}`);
});
