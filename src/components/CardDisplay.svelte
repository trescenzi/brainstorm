<script>
  import { CardImageSizes, getImageLink } from "../scryfall";
  export let card;
  export let card_loading;
  $: image = {
    alt: card
      ? `name:${card.name} type:${card.type_line} text:${card.oracle_text}`
      : "",
    src: card ? getImageLink(card, CardImageSizes.NORMAL) : "",
  };
  $: loading = Boolean(card) && card_loading;
</script>

<div class="card-container">
  <img
    on:load={() => (loading = false)}
    class:loading
    alt={image.alt}
    src={image.src}
  />
  {#if card?.scryfall_uri}
    <a href={card.scryfall_uri}>View on Scryfall</a>
  {/if}
</div>

<style>
  .card-container {
    margin-top: 48px;
    text-align: center;
  }
  img {
    max-width: calc(100% - 32px);
  }

  .loading {
    filter: blur(6px);
  }

  a {
    margin-top: 8px;
    font-size: 24px;
    display: block;
    text-align: center;
  }
</style>
