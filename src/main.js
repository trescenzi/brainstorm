import Main from './main.svelte';
import init from '../pkg/wasm_typeahead.js';

let main = new Main({
  target: document.getElementById('typeaheadMount'),
});

Promise.all([fetch('/allnames.json'), init()])
  .then(([n]) => n.json())
  .then(names => {
    main.wasmCardNames = names.join('|');
  });
