import {useState} from 'preact/hooks';
import { CardImageSizes, getImageLink, ScryFallCard } from "../utils/scryfall";
import classes from './CardImage.module.css';

export function CardImage({
  card,
  onLoad,
}: {
  card: ScryFallCard
  onLoad?: () => void
}) {
  const [loading, setLoading] = useState<boolean>();
  const [front, flip] = useState(true);
  console.log('IMAGE LOADING', loading);

  return <div
      class={classes.cardImage}
    >
    <img
      src={getImageLink(card, CardImageSizes.NORMAL, front)}
      alt={`name:${card.name} type:${card.type_line} text:${card.oracle_text}`}
      onLoad={() => {
        setLoading(false)
        onLoad?.();
      }}
    />
    {card.card_faces && <button 
      type="button"
      name="flip"
      onClick={() => flip(!front)}
      class={classes.transform}
    >Transform</button>}
  </div>
}
