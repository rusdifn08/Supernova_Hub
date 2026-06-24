const fs = require('fs');
let content = fs.readFileSync('seed_physics_indonesia_v2.ts', 'utf8');

const commands = [
  'to'
];

commands.forEach(cmd => {
  const regex = new RegExp(`(?<!\\\\)\\\\\\b${cmd}\\b`, 'g');
  content = content.replace(regex, `\\\\${cmd}`);
});

fs.writeFileSync('seed_physics_indonesia_v2.ts', content);
console.log("Replaced math symbols");
