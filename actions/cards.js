import { ADD_CARD, UPDATE_CARD } from "../constants/actionTypes";
import { addCardToDeck, answerCardInDeck } from "../api";

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function updateCard(card) {
  return {
    type: UPDATE_CARD,
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

export function ansWerCard(card, deckId, callback) {
  return dispatch => {
    answerCardInDeck(deckId, card).then(() => {
      dispatch(updateCard(card));
      if (callback) callback();
    });
  };
}
