import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getFiles(dir, filesList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        getFiles(filePath, filesList);
      }
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

const files = getFiles('apps/web');
let totalReplacements = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  const originalContent = content;
  
  content = content.replace(/http:\/\/\$\{window\.location\.hostname\}:4000/g, '${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:4000\'}');
  content = content.replace(/http:\/\/\$\{hostname\}:4000/g, '${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:4000\'}');

  if (content !== originalContent) {
    writeFileSync(file, content);
    console.log('Updated: ' + file);
    totalReplacements++;
  }
}

console.log('Total files updated: ' + totalReplacements);
