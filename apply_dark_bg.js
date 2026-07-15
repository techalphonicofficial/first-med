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
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/className=(?:\"|\'|\`)(.*?)(?:\"|\'|\`)/g, (match, classStr) => {
    // Only target strings that actually have a light background
    if (!classStr.match(/\bbg-(white|slate-50|sky-50|gray-50|brand-gray)\b/)) {
      return match;
    }
    // If it already handles dark mode background, skip it
    if (classStr.includes('dark:bg-') || classStr.includes('dark:transparent') || classStr.includes('dark:border-')) {
      return match;
    }

    let newClassStr = classStr;
    // Apply intelligent mapping
    if (newClassStr.includes('bg-white')) {
      newClassStr = newClassStr.replace(/\bbg-white\b/g, 'bg-white dark:bg-slate-900 dark:border-slate-800');
    } else if (newClassStr.includes('bg-slate-50')) {
      newClassStr = newClassStr.replace(/\bbg-slate-50\b/g, 'bg-slate-50 dark:bg-slate-950 dark:border-slate-800');
    } else if (newClassStr.includes('bg-sky-50')) {
      newClassStr = newClassStr.replace(/\bbg-sky-50\b/g, 'bg-sky-50 dark:bg-slate-900');
    } else if (newClassStr.includes('bg-gray-50')) {
      newClassStr = newClassStr.replace(/\bbg-gray-50\b/g, 'bg-gray-50 dark:bg-slate-950');
    } else if (newClassStr.includes('bg-brand-gray')) {
      newClassStr = newClassStr.replace(/\bbg-brand-gray\b/g, 'bg-brand-gray dark:bg-slate-800');
    }

    // Since we're adding dark backgrounds, it's also highly likely the borders should adapt.
    // If there's border or shadow, add dark variants for them.
    if (newClassStr.includes('border ') && !newClassStr.includes('dark:border-')) {
        newClassStr = newClassStr.replace(/\bborder\b/g, 'border dark:border-slate-800');
    }

    return match.replace(classStr, newClassStr);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log('Successfully updated ' + changedCount + ' files with dark mode backgrounds!');
