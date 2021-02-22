import Main from './src/main.svelte';
import {preProcessStrings } from './src/search.ts';

let main = new Main({
  target: document.getElementById('typeaheadMount'),
});

fetch('/allnames.json')
  .then(n => n.json())
  .then(names => {
    main.processedCardNames = preProcessStrings(names);
  });
