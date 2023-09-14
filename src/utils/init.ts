import {wasmSupported} from './support';
import type {Typeahead} from '../../pkg/wasm_typeahead';

type Init = {
  Typeahead: Typeahead
} | {
  processedCardNames: any;
} | null;

export async function init() : Promise<Init> {
  const [names, _] = await Promise.all([
    fetch('/allnames.json').then(n => n.json()),
    Promise.resolve()
  ]);

  if (wasmSupported) {
    console.log('Using WASM search');
    const wasm = await import('../../pkg/wasm_typeahead.js');
    const Typeahead = wasm.Typeahead;
    return {
      Typeahead: Typeahead.new(names)
    };
  } else {
    console.log('WASM not supported falling back to js search');
    const {preProcessStrings} = await import('./search');
    return {
      processedCardNames: preProcessStrings(names.split('|'))
    }
  }
}

