import fs from 'node:fs';

const mail = 'https://github.com/1pizzateam/Spock.js';
const CRLF = '\r\n';
const dest = './dist/';
const license = fs.readFileSync('./LICENSE');
const header = `/*${CRLF}${license}${CRLF}${mail}${CRLF}*/${CRLF}${CRLF}`;

const files = [
  ['./build/spock.mjs', `${dest}spock.js`],
  ['./build/spock.d.mts', `${dest}spock.d.ts`],
];

fs.mkdirSync(dest, { recursive: true });
for (const [src, out] of files)
  fs.writeFileSync(out, header + fs.readFileSync(src));
