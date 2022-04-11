import {useState} from 'preact/hooks';
import { CardImageSizes, getImageLink, ScryFallCard } from "../utils/scryfall";

export function CardImage({
  card,
  onLoad,
}: {
  card: ScryFallCard
  onLoad?: () => void
}) {
  const [loading, setLoading] = useState<boolean>();
  console.log('IMAGE LOADING', loading);

  return <img
    src={getImageLink(card, CardImageSizes.NORMAL)}
    alt={`name:${card.name} type:${card.type_line} text:${card.oracle_text}`}
    onLoad={() => {
      setLoading(false)
      onLoad?.();
    }}
  />
}
