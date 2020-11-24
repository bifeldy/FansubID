import morgan from 'morgan';
import chalk from 'chalk';

import logger from './logger';

const morganChalk = morgan((tokens, req, res) => {
  const apiUrl = [
    chalk.blue(tokens['remote-addr'](req, res)),
    chalk.magenta(tokens['remote-user'](req, res)),
    chalk.cyan(tokens.date(req, res)),
    chalk.green(tokens.method(req, res)),
    chalk.red(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
  ].join(' ~ ');
  logger.log(`
    ${tokens['remote-addr'](req, res)} ~
    ${tokens['remote-user'](req, res)} ~
    ${tokens.date(req, res)} ~
    ${tokens.method(req, res)} ~
    ${tokens.status(req, res)} ~
    ${tokens.url(req, res)} ~
    ${tokens['response-time'](req, res) + ' ms'}
  `.replace(/\s\s+/g, ' '), null, true);
  return apiUrl;
});

export default { morganChalk };
