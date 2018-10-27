import { getDecks, addDeck, removeDeck } from "../api";
import {
  GET_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  GET_DECK
} from "../constants/actionTypes";

export function listDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  };
}

export function addNewDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function deleteDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function getDeck(deck) {
  return {
    type: GET_DECK,
    deck
  };
}

export function getAllDecks() {
  return dispatch => {
    getDecks().then(response => {
      let resp = JSON.parse(response);
      let decks = resp ? resp.decks : [];
      dispatch(listDecks(decks));
    });
  };
}

export function insertDeck(deck, successCallback) {
  return dispatch => {
    addDeck(deck).then(() => {
      dispatch(addNewDeck(deck));
      if (successCallback) successCallback();
    });
  };
}

export function deleteDeckById(id) {
  return dispatch => {
    removeDeck(id).then(() => {
      dispatch(deleteDeck(id));
    });
  };
}

export function getDeckById(id, callback) {
  return dispatch => {
    getDecks().then(response => {
      let resp = JSON.parse(response);
      let decks = resp ? resp.decks : [];
      const deck = decks.filter(deckItem => {
        return deckItem.id === id;
      })[0];
      if (callback) callback();
      dispatch(getDeck(deck));
    });
  };
}
