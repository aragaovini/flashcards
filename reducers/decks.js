import {
  GET_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  GET_DECK
} from "../constants/actionTypes";

export function decks(state = [], action) {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;
    case ADD_DECK:
      const updatedState = state.concat(action.deck);
      return updatedState;
    case REMOVE_DECK:
      const newState = state.filter(deck => {
        return deck.id !== action.id;
      });
      return newState;
    case ADD_CARD:
      const { deckId, card } = action;
      let deck = state.filter(deck => {
        return deck.id === deckId;
      })[0];
      deck.cards.push(card);
      return state.map(deckItem => {
        if (deckItem.id === deckId) {
          deckItem = deck;
        }
        return deckItem;
      });
    default:
      return state;
  }
}

export function deck(state = {}, action) {
  switch (action.type) {
    case GET_DECK:
      return action.deck;
    default:
      return state;
  }
}
