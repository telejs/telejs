import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('../package.json', 'utf-8'));
export default { VERSION: pkg.version, APP_NAME: 'Tele.js' };
