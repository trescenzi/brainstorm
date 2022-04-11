enum CardLayout {
  NORMAL = "normal",
  MODAL_DFC = "modal_dfc",
  MELD = "meld",
  TRANSFORM = "transform",
  SPLIT = "split",
}

export enum CardImageSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
  PNG = "png",
  ART_CROP = "art_crop",
  BORDER_CROP = "border_crop",
}
type CardImages = {
  small: string;
  normal: string;
  large: string;
  png?: string;
  art_crop?: string;
  border_crop?: string;
};
type CardLegalities = {
  standard: string;
  future: string;
  historic: string;
  gladiator: string;
  pioneer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  brawl: string;
  duel: string;
  oldschool: string;
  premodern: string;
};
type CardPrices = {
  usd: string;
  usd_foil: string;
  eur: string;
  eur_foil: string;
  tix: string;
};
type RelatedUris = {
  gatherer: string;
  tcgplayer_decks: string;
  edhrec: string;
  mtgtop8: string;
};
type PurchaseUris = {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
};
enum CardColor {
  BLACK = "B",
  BLUE = "U",
  WHITE = "W",
  GREEN = "G",
  RED = "R",
}
enum Game {
  MTGO = "mtgo",
  PAPER = "paper",
  ARENA = "arena",
}
enum Rarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  MYTHIC = "mythic",
}

type CardFace = {
  object: string;
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  colors: [CardColor];
  power: string;
  toughness: string;
  flavor_text: string;
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: CardImages;
};
export type ScryFallCard = {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: [number];
  mtgo_id: number;
  mtgo_foil_id: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: CardLayout;
  highres_image: boolean;
  image_uris: CardImages;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  colors: [CardColor];
  color_identity: [CardColor];
  keywords: [string];
  legalities: CardLegalities;
  games: [Game];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: Rarity;
  card_back_id: string;
  artist: string;
  artist_ids: [string];
  illustration_id: string;
  border_color: string;
  frame: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  prices: CardPrices;
  related_uris: RelatedUris;
  purchase_uris: PurchaseUris;
  card_faces?: [CardFace];
};

function promiseDebounce(func: Function, wait: number): Function {
  let timeout: number | undefined;
  let previousReject: Function | null;
  return function (this: any) {
    const args = arguments;
    let resolve: Function | null;
    let reject: Function | null;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      previousReject = reject;
      reject = _reject;
    });
    var later = async () => {
      timeout = undefined;
      try {
        const resolveVal = await func.apply(this, args);
        resolve && resolve(resolveVal);
      } catch (e) {
        reject && reject(e);
      }
    };
    if (timeout && previousReject) {
      previousReject("DEBOUNCED");
      reject = null;
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    return promise;
  };
}

export async function exactName(name: string): Promise<ScryFallCard> {
  return fetch(`https://api.scryfall.com/cards/named?exact=${name}`, {
    mode: "cors", // no-cors, *cors, same-origin,
  })
    .then((x) => x.json())
    .then((cardData) => {
      console.log("got card data", cardData);
      return cardData;
    });
}

export function getImageLink(
  card: ScryFallCard,
  size: CardImageSizes
): string | undefined {
  if (card.image_uris) {
    return card.image_uris[size];
  }

  if (card.card_faces) {
    return card.card_faces[0].image_uris[size];
  }
}

export function isScryfallSearch(query: string): boolean {
  return query.slice(0, 5).toLowerCase() === "scry:";
}

async function _fullSeach(query: string): Promise<ScryFallCard[]> {
  return fetch(
    `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
      query.slice(5)
    )}&order=edhrec`,
    {
      mode: "cors", // no-cors, *cors, same-origin,
    }
  )
    .then((x) => x.json())
    .then((cardData) => {
      console.log("got scry data", cardData);
      return cardData.data.slice(0, 10);
    });
}

export const fullSeach = promiseDebounce(_fullSeach, 600);

export function namesFromCards(cards: ScryFallCard[]): string[] {
  return cards.map(({ name }) => name);
}

export function isScryfallCard(card: any) {
  return card && typeof card === "object" && card.multiverse_ids;
}
