import init, {Typeahead} from '../pkg/wasm_typeahead.js';
import {preProcessStrings, search} from './search';

let typeahead;
let processedCardNames;
Promise.all([fetch('/allnames.json'), init()])
  .then(([n]) => n.json())
  .then(names => {
    const wasmCardNames = names.join('|');
    typeahead = Typeahead.new(wasmCardNames);
    const processedCardNames = preProcessStrings(names);
    let now = Date.now();
    benchmark((str) => typeahead.search(str))
    wasm.innerText = Date.now() - now;
    now = Date.now();
    benchmark((str) => search(str, processedCardNames));
    js.innerText = Date.now() - now;
  });

function benchmark(fn) {
  fn('u');
  fn('ul');
  fn('ula');
  fn('ulam');
  fn('ulamo');
  fn('ulamog');
  fn('ulamo');
  fn('ulam');
  fn('ula');
  fn('ul');
  fn('u');
  fn('ur');
  fn('urz');
  fn('urza');
  fn('urza t');
  fn('urza to');
  fn('urza tow');
  fn('urza towe');
  fn('urza tower');
  fn('');
  fn('a');
  fn('at');
  fn('ato');
  fn('atog');
  fn('s');
  fn('se');
  fn('sea');
  fn('sea g');
  fn('sea ga');
  fn('sea gat');
  fn('sea gate');
  fn('g');
  fn('ga');
  fn('gat');
  fn('gate');
  fn('gatew');
  fn('gatewa');
  fn('gatewat');
  fn('gatewatc');
  fn('gatewatch');
  fn('c');
  fn('ca');
  fn('cal');
  fn('call');
  fn('b');
  fn('bl');
  fn('bla');
  fn('blac');
  fn('black');
  fn('black l');
  fn('black lo');
}
