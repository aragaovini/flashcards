import { ADD_CARD, UPDATE_CARD, RESET_CARDS } from "../constants/actionTypes";
import { addCardToDeck, answerCardInDeck, restartCards } from "../api";

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

export function resetCards(deckId) {
  return {
    type: RESET_CARDS,
    deckId
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

export function answerCard(card, deckId, callback) {
  return dispatch => {
    answerCardInDeck(deckId, card).then(() => {
      dispatch(updateCard(card));
      if (callback) callback();
    });
  };
}

export function resetQuiz(deckId, callback) {
  return dispatch => {
    restartCards(deckId).then(() => {
      dispatch(resetCards(deckId));
      if (callback) callback();
    });
  };
}
