import { GET_DECKS, ADD_DECK } from "../constants/actionTypes";

export default function decks(state = [], action) {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;
    case ADD_DECK:
      updatedState = state.concat(action.deck);
      return updatedState;
    default:
      return state;
  }
}
