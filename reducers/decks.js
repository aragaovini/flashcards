import { GET_DECKS, ADD_DECK, REMOVE_DECK } from "../constants/actionTypes";

export default function decks(state = [], action) {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;
    case ADD_DECK:
      const updatedState = state.concat(action.deck);
      return updatedState;
    case REMOVE_DECK:
      const newState = state.filter(deck => {
        return deck.id != action.id;
      });
      return newState;
    default:
      return state;
  }
}
