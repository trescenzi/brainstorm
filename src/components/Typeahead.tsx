import {useState} from 'preact/hooks';
import classes from './Typeahead.module.css';

export function Typeahead({
  onSelect: externalOnSelect,
  search,
}: {
  search: (option: string) => string[];
  onSelect: (option: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cardNames, setCardNames] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [selectedCardName, setSelectedCardName] = useState('');
  const onSelect = (n: string) => {
    setInputVal(n);
    setSelectedCardName(n);
    setCardNames(search(n));
    setIsOpen(false);
    externalOnSelect(n);
  };

  return <div 
   class={classes.typeaheadContainer}
   onFocus={() => setIsOpen(true)}
  >
    <input
      class={classes.typeahead}
      value={inputVal.length > 0 ? inputVal : undefined}
      id="autocomplete"
      aria-autocomplete="list"
      aria-labeledby="input-label"
      aria-expanded={isOpen}
      placeholder=""
      onInput={({target}) => {
        const v = (target as any).value
        setInputVal(v);
        !isOpen && setIsOpen(true);
        setCardNames(search(v));
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 40) { //down
          const currentIndex = cardNames.findIndex(name => name === selectedCardName);
          !isOpen && setIsOpen(true);
          setSelectedCardName(cardNames[currentIndex + 1 >= cardNames.length ? 0 : currentIndex + 1])
        } else if (e.keyCode === 38) { //up
          const currentIndex = cardNames.findIndex(name => name === selectedCardName);
          !isOpen && setIsOpen(true);
          setSelectedCardName(cardNames[currentIndex - 1 < 0 ? cardNames.length - 1 : currentIndex - 1])
        } else if (e.keyCode === 13) { //enter
          onSelect(selectedCardName);
        } else if (e.keyCode === 27) { //esc
          setIsOpen(false);
        }
      }}
    />
    <label id="input-label" htmlFor='autocomplete'>Card Name:</label>
    {isOpen &&
      <ul class={classes.typeaheadList}>
        {cardNames.map(name => <li
          key={name}
          aria-selected={selectedCardName === name}
          onClick={() => {
            setIsOpen(false);
            onSelect(name);
          }}
          onMouseOver={() => {
            setSelectedCardName(name);
          }}
        >{name}</li>)}
      </ul>
    }
  </div>
}
