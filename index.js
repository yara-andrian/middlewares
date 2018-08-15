const _ = require('lodash');
const jwt = require('express-jwt');

const theme = function (req, res, next) {
  if (req.query.theme) {
    req.session.theme = req.query.theme;
  }
  res.locals.themes = [
    'Bootstrap',
    'Cerulean',
    'Cosmo',
    'Cyborg',
    'Darkly',
    'Flatly',
    'Journal',
    'Lumen',
    'Paper',
    'Readable',
    'Sandstone',
    'Simplex',
    'Slate',
    'Spacelab',
    'Superhero',
    'United',
    'Yeti',
  ];
  res.locals.currentTheme = req.session.theme || 'Bootstrap';
  next();
};

const flashMessages = function (req, res, next) {
  const flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };
  res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;
  next();
};

const checkJwt = ({ uri, audience, issuer }) => jwt({
  secret: secret,
  // Validate the audience and the issuer.
  audience: audience,
  issuer: issuer,
  algorithms: ['RS256']
});

module.exports = {
  theme,
  flashMessages,
  checkJwt
}