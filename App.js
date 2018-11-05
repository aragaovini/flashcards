import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import DeckForm from "./screens/DeckForm";
import DeckDetails from "./screens/DeckDetails";
import CardForm from "./screens/CardForm";
import Quiz from "./screens/Quiz";
import { Provider } from "react-redux";
import Store from "./store";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Decks"
    }
  },
  DeckForm: {
    screen: DeckForm,
    navigationOptions: {
      title: "Deck Form"
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: "Deck Details"
    }
  },
  CardForm: {
    screen: CardForm,
    navigationOptions: {
      title: "Card Form"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={Store}>
        <Stack />
      </Provider>
    );
  }
}
