import { ScryFallCard } from "../utils/scryfall";
import classes from './CardText.module.css';

export function CardText({card}: {card: ScryFallCard}) {
  console.log(card);
  return <div class={classes.cardText} name="card_text">
    <div class={classes.nameLine}>
      <p name="card_name">{card.name}</p>
      <p name="card_cost">{card.mana_cost}</p>
    </div>
    <div><p name="type_line">{card.type_line}</p></div>
    <div class={classes.divider} />
    <div name="oracle_text" class={classes.oracleText}>
      {card.oracle_text.split('\n').map(line => <p>{line}</p>)}
    </div>
  </div>
}
