import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY } from "../constants/api";

export function addDeck(deck) {
  return getDecks().then(store => {
    let decks = parseDecks(store);
    decks.push(deck);
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}

export function removeDeck(id) {
  return getDecks().then(store => {
    let decks = parseDecks(store);
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
    let decks = parseDecks(store);

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

export function answerCardInDeck(deckId, card) {
  return getDecks().then(store => {
    let decks = parseDecks(store);

    // Updating the card in the specific deck
    let deck = decks.filter(deck => {
      return deck.id === deckId;
    })[0];

    deck.cards =
      deck.cards &&
      deck.cards.map(cardItem => {
        if (cardItem.id === card.id) {
          cardItem = card;
        }
        return cardItem;
      });

    // Updating the deck
    decks = decks.map(deckItem => {
      if (deckItem.id === deckId) {
        deckItem = deck;
      }
      return deckItem;
    });

    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}

export function restartCards(deckId) {
  return getDecks().then(store => {
    let decks = parseDecks(store);

    // Updating the card in the specific deck
    let deck = decks.filter(deck => {
      return deck.id === deckId;
    })[0];

    // Reseting result and answered attributes
    deck.cards =
      deck.cards &&
      deck.cards.map(card => {
        card.result = null;
        card.answered = false;
        return card;
      });

    // Updating the deck
    decks = decks.map(deckItem => {
      if (deckItem.id === deckId) {
        deckItem = deck;
      }
      return deckItem;
    });

    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ decks }));
  });
}

function parseDecks(store) {
  store = JSON.parse(store);
  return store ? store.decks : [];
}
