<svelte:options accessors />

<script>
  import Typeahead from "./components/Typeahead.svelte";
  import CardDisplay from "./components/CardDisplay.svelte";
  import CardInfo from "./components/CardInfo.svelte";
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
  <CardInfo {card} />
  <CardDisplay {card} card_loading={loading} />
</div>

<style>
  .container {
    display: grid;
    grid-template-areas: "t"
                         "d"
                         "i";
  }
  @media (min-width: 750px) {
    .container {
      grid-template-areas: "t t d"
                         "i i d";
      grid-auto-row: 60px 1fr;
    }
  }
</style>
