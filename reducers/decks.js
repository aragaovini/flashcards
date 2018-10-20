import { GET_DECKS } from "../constants/actionTypes";

export default function decks(state = [], action) {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;
    default:
      return state;
  }
}
