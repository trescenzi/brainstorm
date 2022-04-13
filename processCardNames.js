import fs from 'fs';
import fetch from 'node-fetch';

async function main() {
  console.log('Grabbing card names from mtgjson');
  const allPrintings = await (await fetch('https://mtgjson.com/api/v5/AllPrintings.json')).json();
  console.log(`Got ${Object.keys(allPrintings.data)} sets`);
  const allNames = [...new Set(Object.values(allPrintings.data).reduce((all, {cards}) => [...all, ...cards.map(({name}) => name)], []))];
  console.log(`Found ${allNames.length} names`);
  fs.writeFileSync('./build/allnames.json', JSON.stringify(allNames.join('|')));
}

main();
