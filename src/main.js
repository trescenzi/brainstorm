import Main from './main.svelte';
import init from '../pkg/wasm_typeahead.js';
import {preProcessStrings } from './search.ts';
import {wasmSupported} from './support.ts';

let main = new Main({
  target: document.getElementById('typeaheadMount'),
});

Promise.all([fetch('/allnames.json'), wasmSupported ? init() : Promise.resolve()])
  .then(([n]) => n.json())
  .then(names => {
    if (wasmSupported) {
      console.log('Using WASM search');
      main.wasmCardNames = names.join('|');
    } else {
      console.log('WASM not supported falling back to js search');
      main.processedCardNames = preProcessStrings(names);
    }
  });
