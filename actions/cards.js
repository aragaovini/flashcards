import { ADD_CARD } from "../constants/actionTypes";
import { addCardToDeck } from "../api";
import uuidv1 from "uuid/v1";

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function addNewCard(deckId, card, callback) {
  card.id = uuidv1();
  return dispatch => {
    addCardToDeck(deckId, card).then(resp => {
      dispatch(addCard(deckId, card));
      if (callback) callback();
    });
  };
}
