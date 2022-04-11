import { render } from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks';
import {wasmSupported} from './utils/support';
import {exactName, ScryFallCard} from './utils/scryfall';
import initWasm from '../pkg/wasm_typeahead.js';
import type {Typeahead} from '../pkg/wasm_typeahead';
import {Typeahead as PreactTypeahead} from './components/Typeahead';
import {CardImage} from './components/CardImage';
import './index.css'

type Init = {
  wasmCardNames: string;
  Typeahead: Typeahead
} | {
  processedCardNames: any;
} | null;

async function init() : Promise<Init> {
  const [names, _] = await Promise.all([
    fetch('/allnames.json').then(n => n.json()),
    wasmSupported ? initWasm() : Promise.resolve()
  ]);

  if (wasmSupported) {
    console.log('Using WASM search');
    const wasm = await import('../pkg/wasm_typeahead.js');
    const Typeahead = wasm.Typeahead as unknown as Typeahead;
    return {
      wasmCardNames: names.join('|'),
      Typeahead
    };
  } else {
    console.log('WASM not supported falling back to js search');
    const {preProcessStrings} = await import('./utils/search');
    return {
      processedCardNames: preProcessStrings(names)
    }
  }
}

function App() {
  const [selectedCard, setSelectedCard] = useState<ScryFallCard | null>(null);
  const typeahead = useRef<Typeahead>();
  useEffect(() => {
    async function run() {
      const initVal = await init();
      if (!initVal) {
        throw new Error('FAILED TO INIT');
      }

      if ('wasmCardNames' in initVal) {
        typeahead.current = initVal.Typeahead.new(initVal.wasmCardNames);
        return;
      }
    }
    run();
  }, []);

  return <div>
    <PreactTypeahead
      search={(name) => {
        if (typeahead.current) {
          return typeahead.current.search(name).split('|');
        }
        return [];
      }}
      onSelect={async (name) => {
        setSelectedCard(await exactName(name));
      }}
    />
    {selectedCard && <CardImage card={selectedCard} />}
  </div>
}

render(<App />, document.getElementById('app')!)
