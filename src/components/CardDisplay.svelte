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
</div>

<style>
  .card-container {
    margin-top: 48px;
    text-align: center;
    grid-area: d;
  }
  img {
    max-width: calc(100% - 32px);
  }

  .loading {
    filter: blur(6px);
  }
</style>
