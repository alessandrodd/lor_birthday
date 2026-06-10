import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const htmlFiles = ['index.html', 'premio.html'];
let validatedScripts = 0;

htmlFiles.forEach((fileName) => {
  const html = readFileSync(new URL(`../${fileName}`, import.meta.url), 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];

  if (scripts.length === 0) {
    throw new Error(`No inline script blocks found in ${fileName}`);
  }

  scripts.forEach((match, index) => {
    new vm.Script(match[1], { filename: `${fileName}#script-${index + 1}` });
    validatedScripts++;
  });
});

console.log(`Validated ${validatedScripts} inline script block(s) in ${htmlFiles.join(', ')}.`);
