<script>
  import { CardImageSizes, getImageLink } from "../scryfall";
  export let card;
</script>

<div class="card-details">
  {#if card?.prices?.usd}
    <div class="prices">
      <div>TCG Player:<a href={card?.purchase_uris?.tcgplayer}
rel="noopener">${card?.prices?.usd}</a></div>
      <div>Cardmarket:<a href={card?.purchase_uris?.cardmarket}
rel="noopener">€{card?.prices?.eur}</a></div>
    </div>
  {/if}
  {#if card?.scryfall_uri}
    <a target="_blank" rel="noopener" href={card.scryfall_uri}>View on Scryfall</a>
  {/if}
</div>

<style>
  .card-details {
    grid-area: i;
  }

  .prices {
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
    width: 200px;
    
  }

  .prices a {
    font-size: 16px;
  }

  a {
    margin-top: 8px;
    font-size: 24px;
    display: block;
    text-align: center;
    color: var(--blue);
  }
</style>
