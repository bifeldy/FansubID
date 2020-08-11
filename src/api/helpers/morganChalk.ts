import morgan from 'morgan';
import chalk from 'chalk';

const morganChalk = morgan((tokens, req, res) => {
  return [
    chalk.blue(tokens['remote-addr'](req, res)),
    chalk.magenta(tokens['remote-user'](req, res)),
    chalk.cyan(tokens.date(req, res)),
    chalk.green(tokens.method(req, res)),
    chalk.red(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
  ].join(' ~ ');
});

export default { morganChalk };
