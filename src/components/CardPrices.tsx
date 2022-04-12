import {ScryFallCard} from '../utils/scryfall';
import classes from './CardPrices.module.css';

function CardPrice({
  price,
  unit,
}: {
  price: string,
  unit: string,
}) {
  return <p>{unit}{' '}{price}</p>
}

export function CardPrices({card}: {card: ScryFallCard}) {
  return <div class={classes.prices}>
    <a 
      class={classes.price} 
      href={card.purchase_uris.tcgplayer}
      rel="noopener"
      target="_blank"
    >
      <p class={classes.store}>TCG Player</p>
      <CardPrice price={card.prices.usd} unit="$" />
    </a>
    <a
      class={classes.price} 
      href={card.purchase_uris.tcgplayer}
      rel="noopener"
      target="_blank"
    >
      <p class={classes.store}>Card Market</p>
      <CardPrice price={card.prices.eur} unit="€" />
    </a>
  </div>
}
