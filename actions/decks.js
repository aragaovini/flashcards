import { getDecks, addDeck } from "../api";
import { GET_DECKS, ADD_DECK } from "../constants/actionTypes";

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
