import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];

if (scripts.length === 0) {
  throw new Error('No inline script blocks found in index.html');
}

scripts.forEach((match, index) => {
  new vm.Script(match[1], { filename: `index.html#script-${index + 1}` });
});

console.log(`Validated ${scripts.length} inline script block(s) in index.html.`);
