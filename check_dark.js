const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

let files = walk('./src');
let suspects = [];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let matches = content.match(/className=(?:\"|\'|\`)[^\!\"]*?(bg-white|bg-slate-50|bg-sky-50|bg-gray-50|bg-brand-gray)[^\!\"]*?(?:\"|\'|\`)/g);
  if(matches) {
    let missing = matches.filter(m => !m.includes('dark:bg-') && !m.includes('dark:transparent') && !m.includes('dark:border-'));
    if(missing.length > 0) {
      suspects.push({ file, missingCount: missing.length });
    }
  }
});

console.log(JSON.stringify(suspects, null, 2));
