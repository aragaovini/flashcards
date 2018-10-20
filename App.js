import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import AddDeck from "./screens/AddDeck";
import { Provider } from "react-redux";
import Store from "./store";

const Stack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Decks"
    }
  },
  AddDeck: {
    screen: AddDeck
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
