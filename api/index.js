import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY } from "../constants/api";
import uuidv1 from "uuid/v1";

export function addDeck(deck) {
  deck.id = uuidv1();
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
