import { promises as Fs } from 'fs';
import Path from 'path';
import glob from 'glob';

const targetDir = Path.resolve('./build');
process.chdir(targetDir);

glob('**/*.js', async (err, jsFiles) => {
  for (const jsFile of jsFiles) {
    const cjsFile = jsFile.replace('.js', '.cjs');
    const jsMapFile = `${jsFile}.map`;
    const cjsMapFile = `${cjsFile}.map`;

    await Fs.rename(jsFile, cjsFile);
    await Fs.rename(jsMapFile, cjsMapFile);

    const cjsContent = (await Fs.readFile(cjsFile, 'utf-8')).split('\n');
    cjsContent[cjsContent.length - 1] = `//# sourceMappingURL=${Path.basename(cjsMapFile)}`;
    await Fs.writeFile(cjsFile, cjsContent.join('\n'));

    const map = JSON.parse(await Fs.readFile(cjsMapFile, 'utf-8'));
    map.file = Path.basename(cjsFile);
    await Fs.writeFile(cjsMapFile, JSON.stringify(map));
  }
});

