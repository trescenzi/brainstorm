import {ScryFallCard, CardLegality as TCardLegality} from '../utils/scryfall';
import classes from './CardLegality.module.css';

function CardLegality({format, legality}: {format: string, legality: TCardLegality}) {
  return <div class={classes[legality]}>{format}</div>
}

export function CardLegalities({card}: {card: ScryFallCard}) {
  return <div class={classes.legalities}>
    <div class={classes.legalitiesHeader}>
      <h2><b>{card.name}</b> legality across formats:</h2>
    </div>
    <CardLegality format="commander" legality={card.legalities.commander} />
    <CardLegality format="modern" legality={card.legalities.modern} />
    <CardLegality format="legacy" legality={card.legalities.legacy} />
    <CardLegality format="vintage" legality={card.legalities.vintage} />
    <CardLegality format="pioneer" legality={card.legalities.pioneer} />
    <CardLegality format="standard" legality={card.legalities.standard} />
    <CardLegality format="explorer" legality={card.legalities.standard} />
    <CardLegality format="historic" legality={card.legalities.standard} />
    <div class={classes.legalityKey}>
      <div class={classes.legal} />
      <span>Legal</span>
    </div>
    <div class={classes.legalityKey}>
      <div class={classes.not_legal} />
      <span>Not Legal</span>
    </div>
    <div class={classes.legalityKey}>
      <div class={classes.banned } />
      <span>Banned</span>
    </div>
    <div class={classes.legalityKey}>
      <div class={classes.restricted} />
      <span>Restricted</span>
    </div>
  </div>
}
