<script>
  import {onMount} from 'svelte';
  import { isScryfallSearch, fullSeach, namesFromCards } from "../scryfall";
  import {search} from '../search';
  import {wasmSupported} from '../support';

  export let _cardNames = null;
  export let onSelect = () => {};
  let scryedCards = [];
  let cardNames = [];
  let typeahead;
  let Typeahead;

  if (wasmSupported) {
    onMount(async () => {
      Typeahead = (await import('../../pkg/wasm_typeahead.js')).Typeahead;
    });
  }


  $: if (_cardNames && wasmSupported) {
    typeahead = Typeahead.new(_cardNames);
  }

  function onInput(e) {
    if (!_cardNames) return;

    const query = e.target.value;
    if (query.length === 0) return;

    if (query.length > 6 && isScryfallSearch(query)) {
      fullSeach(query)
        .then((cards) => {
          scryedCards = cards;
          return namesFromCards(cards);
        })
        .then((names) => (cardNames = names));
      return;
    }

    if (wasmSupported) {
      cardNames = typeahead.search(query).split('|');
    } else {
      const result = search(query, _cardNames);
      cardNames = result.map(({ val }) => val);
    }
  }
</script>

<div class="typeahead-container">
  <label class="typeahead">
    <input on:input={onInput} placeholder=" " />
    <span>Enter a Card Name</span>
  </label>
  <div class="typeahead-list">
    {#each cardNames as name}
      <div
        on:click={() =>
          onSelect(
            name,
            scryedCards.find(({ name: cardName }) => name === cardName)
          )}
      >
        {name}
      </div>
    {/each}
  </div>
</div>

<style>
  .typeahead-container {
    position: relative;
    flex: 1;
  }

  .typeahead {
    display: grid;
    border-bottom: 2px solid var(--blue);
  }

  .typeahead,
  .typeahead input {
    color: var(--black);
    font-size: 2rem;
  }

  .typeahead span,
  .typeahead input {
    grid-column: 1/1;
    grid-row: 1/1;
  }

  .typeahead input:not(:placeholder-shown) + span,
  .typeahead input:focus-within + span {
    display: none;
  }

  .typeahead input {
    appearance: none;
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
  }

  .typeahead-list {
    display: none;
    margin-top: 16px;
    width: 100%;
    position: absolute;
    font-size: 1.5rem;
    background-color: var(--grey);
  }

  .typeahead-list div {
    border-bottom: 3px solid transparent;
  }
  .typeahead-list div:hover {
    cursor: pointer;
    border-bottom: 3px solid var(--yellow);
  }

  .typeahead:focus-within + .typeahead-list,
  .typeahead-list:hover {
    display: grid;
    justify-content: center;
    align-content: center;
  }

  @media (min-width: 750px) {
    .typeahead:focus-within + .typeahead-list,
    .typeahead-list:hover {
      display: grid;
      justify-content: start;
      align-content: start;
    }
  }
</style>
