import { readFileSync } from 'fs';
import { resolve } from 'path';
const root = __dirname.replace(/(lib|src)$/i, '');
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
export default { VERSION: pkg.version, APP_NAME: 'Tele.js' };
