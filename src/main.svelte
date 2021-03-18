<svelte:options accessors />

<script>
  import Typeahead from "./components/Typeahead.svelte";
  import CardDisplay from "./components/CardDisplay.svelte";
  import { exactName, isScryfallCard } from "./scryfall";

  export let wasmCardNames = null;
  export let processedCardNames = null;
  let card = null;
  let loading = false;
</script>

<div class="container">
  <Typeahead
    onSelect={(_name, _card) => {
      if (!isScryfallCard(_card)) {
        loading = true;
        exactName(_name).then((c) => {
          card = c;
          loading = false;
        });
      } else {
        card = _card;
      }
    }}
    _cardNames={wasmCardNames || processedCardNames}
  />
  <CardDisplay {card} card_loading={loading} />
</div>

<style>
  @media (min-width: 750px) {
    .container {
      display: flex;
    }
  }
</style>
