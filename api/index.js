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

export function getDecks() {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}
