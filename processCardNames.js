const fs = require('fs');
const unique = require('lodash').uniq;
const fetch = require('node-fetch');

async function main() {
  console.log('Grabbing card names from mtgjson');
  const allPrintings = await (await fetch('https://mtgjson.com/api/v5/AllPrintings.json')).json();
  console.log(`Got ${Object.keys(allPrintings.data)} sets`);
  const allNames = unique(Object.values(allPrintings.data).reduce((all, {cards}) => [...all, ...cards.map(({name}) => name)], []));
  console.log(`Found ${allNames.length} names`);
  fs.writeFileSync('./public/allnames.json', JSON.stringify(allNames));
}

main();
