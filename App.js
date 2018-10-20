import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import AddDeck from "./screens/AddDeck";

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
    return <Stack />;
  }
}
