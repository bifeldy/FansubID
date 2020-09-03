import fs from 'fs';

// tslint:disable-next-line: typedef
function log(text) {
  fs.appendFile('stdout.log', text + '\n', (err) => {
    if (err) {
      throw err;
    }
  });
}

export default { log };
