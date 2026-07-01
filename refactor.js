const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Replace rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl with rounded
  // We avoid replacing rounded-full because that's for circles.
  content = content.replace(/\brounded-(sm|md|lg|xl|2xl|3xl)\b/g, 'rounded');
  
  // Replace specific corner roundings
  content = content.replace(/\brounded-([trblxy]+)-(sm|md|lg|xl|2xl|3xl)\b/g, 'rounded-$1');

  // Replace shadow-lg, shadow-xl, shadow-2xl with shadow-md
  content = content.replace(/\bshadow-(lg|xl|2xl|inner|none|\[.*?\])\b/g, 'shadow-md');
  
  // Replace border-2, border-4, border-8 with border
  content = content.replace(/\bborder-[2-9]\b/g, 'border');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Refactor complete.');
