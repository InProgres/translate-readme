const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const core = require('@actions/core');
const google_translate_api = require('@k3rn31p4nic/google-translate-api');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const visit = require('unist-util-visit');
const simpleGit = require('simple-git');
const git = simpleGit();

const toAst = markdown => {
  return unified().use(parse).parse(markdown);
};

const toMarkdown = ast => {
  return unified().use(stringify).stringify(ast);
};

const mainDir = '.';
let README = readdirSync(mainDir).includes('readme.md')
  ? 'readme.md'
  : 'README.md';

const LANG = core.getInput('LANG');
console.log(LANG);
const langs = JSON.parse(LANG) || ['zh-CN'];
console.log(langs);
const readme = readFileSync(join(mainDir, README), { encoding: 'utf8' });
const readmeAST = toAst(readme);
console.log('AST CREATED AND READ');

async function writeToFile(lang) {
  let originalText = [];

  visit(readmeAST, async node => {
    if (node.type === 'text') {
      originalText.push(node.value);
      node.value = (await google_translate_api(node.value, { to: lang })).text;
    }
  });

  const translatedText = originalText.map(async text => {
    return (await google_translate_api(text, { to: lang })).text;
  });

  await Promise.all(translatedText);
  writeFileSync(
    join(mainDir, `README.${lang}.md`),
    toMarkdown(readmeAST),
    'utf8'
  );
  console.log(`README.${lang}.md written`);
}

async function commitChanges() {
  console.log('commit started');
  await git.add('./*');
  await git.addConfig('user.name', 'github-actions[bot]');
  await git.addConfig(
    'user.email',
    '41898282+github-actions[bot]@users.noreply.github.com'
  );
  await git.commit('add README.md translation');
  console.log('finished commit');
  await git.push();
  console.log('pushed');
}

(async function translateReadme() {
  try {
    for (const lang of langs) {
      console.log(lan);
      await writeToFile(lang);
    }
    await commitChanges();
    console.log('Done');
  } catch (error) {
    console.error(error);
  }
})();
