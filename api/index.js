import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY } from "../constants/api";

export function addDeck(deck) {
  return getDecks().then(store => {
    store = JSON.parse(store);
    let decks = store ? store.decks : [];
    decks.push(deck);
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}

export function removeDeck(id) {
  return getDecks().then(store => {
    store = JSON.parse(store);
    let decks = store ? store.decks : [];
    decks = decks.filter(deckItem => {
      return deckItem.id != id;
    });
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}

export function getDecks() {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function addCardToDeck(deckId, card) {
  return getDecks().then(store => {
    store = JSON.parse(store);
    let decks = store ? store.decks : [];

    // Adding the card to the specific deck
    let deck = decks.filter(deck => {
      return deck.id === deckId;
    })[0];
    deck.cards.push(card);

    // Updating the deck
    decks.map(deckItem => {
      if (deckItem.id === deckId) {
        deckItem = deck;
      }
      return deckItem;
    });

    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}
