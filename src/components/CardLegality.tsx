import {ScryFallCard, CardLegality as TCardLegality} from '../utils/scryfall';
import classes from './CardLegality.module.css';

function CardLegality({format, legality}: {format: string, legality: TCardLegality}) {
  return <div class={classes[legality]}>{format}</div>
}

export function CardLegalities({card}: {card: ScryFallCard}) {
  return <div class={classes.legalities}>
    <CardLegality format="commander" legality={card.legalities.commander} />
    <CardLegality format="modern" legality={card.legalities.modern} />
    <CardLegality format="legacy" legality={card.legalities.legacy} />
    <CardLegality format="vintage" legality={card.legalities.vintage} />
    <CardLegality format="pioneer" legality={card.legalities.pioneer} />
    <CardLegality format="standard" legality={card.legalities.standard} />
  </div>
}
