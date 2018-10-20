import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import DeckForm from "./screens/DeckForm";
import { Provider } from "react-redux";
import Store from "./store";

const Stack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Decks"
    }
  },
  DeckForm: {
    screen: DeckForm
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Stack />
      </Provider>
    );
  }
}
