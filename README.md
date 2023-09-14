# Brainstorm

[Scryfall](scryfall.com) is awesome for complex searches especially while deckbuilding but sometimes you just need really really fast fuzzy name based searching. Brainstorm is an experiment in just how fast such a search could be. By using a simple rust function which is optimized for finding cards 10 by exact name and falling back to a fuzzy search Brainstorm achieves a 60fps typeahead experience.

Of course this also means making a few tradeoffs the largest of which is that every name needs to be loaded into memory on the frontend. This results in a total downloadsize of around ~250kb which isn't small, however it's well within reasonable limits of a "modern" web app. In addition 75% of that size is simply the card names so not much js parsing needs to be done.

Brainstorm relies on the Scryfall api to fetch the information that it displays after the user selects a card name. The card names themselves come from MTGJSON another incredible tool from the magic community. 
