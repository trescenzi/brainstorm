import { render } from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks';
import {exactName, ScryFallCard} from './utils/scryfall';
import {init} from './utils/init';
import {CardImage} from './components/CardImage';
import {CardText} from './components/CardText';
import {CardPrices} from './components/CardPrices';
import {Typeahead as PreactTypeahead} from './components/Typeahead';
import type {Typeahead} from '../pkg/wasm_typeahead';
import './index.css'

function App() {
  const [selectedCard, setSelectedCard] = useState<ScryFallCard | null>(null);
  const typeahead = useRef<Typeahead>();
  useEffect(() => {
    async function run() {
      const initVal = await init();
      if (!initVal) {
        throw new Error('FAILED TO INIT');
      }

      if ('Typeahead' in initVal) {
        typeahead.current = initVal.Typeahead
        return;
      }
    }
    run();
  }, []);

  return <div class="main">
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
    {selectedCard && <CardText card={selectedCard} />}
    {selectedCard && <CardPrices card={selectedCard} />}
  </div>
}

render(<App />, document.getElementById('app')!)
