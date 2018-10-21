import { ADD_CARD } from "../constants/actionTypes";
import { addCardToDeck } from "../api";

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function addNewCard(deckId, card, callback) {
  return dispatch => {
    addCardToDeck(deckId, card).then(resp => {
      dispatch(addCard(deckId, card));
      if (callback) callback();
    });
  };
}
