import {
  GET_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  GET_DECK,
  UPDATE_CARD,
  RESET_CARDS
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
    case UPDATE_CARD:
      const { card } = action;
      const updatedCards =
        state.cards &&
        state.cards.map(cardItem => {
          if (cardItem.id === card.id) {
            cardItem = card;
          }
          return cardItem;
        });
      const newState = state;
      newState.cards = updatedCards;
      return newState;
    case RESET_CARDS:
      const resetedCards =
        state.cards &&
        state.cards.map(card => {
          card.result = null;
          card.answered = false;
          return card;
        });
      const updatedState = state;
      updatedState.cards = resetedCards;
      return updatedState;
    default:
      return state;
  }
}
