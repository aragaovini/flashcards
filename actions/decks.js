import { getDecks } from "../api";
import { GET_DECKS } from "../constants/actionTypes";

export function listDecks(decks) {
  return {
    type: GET_DECKS,
    decks
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
