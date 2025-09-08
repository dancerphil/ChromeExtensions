import fs from 'fs';
import path from 'path';
import url from 'url';
import {globSync} from 'glob';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const main = () => {
    const root = path.join(dirname, '..');
    const files = globSync(`${root}/public/**/*`, {nodir: true});
    files.forEach((file) => {
        const suffix = file.slice(`${root}/public/`.length);
        fs.cpSync(file, `${root}/dist/${suffix}`);
    });
};

main();
