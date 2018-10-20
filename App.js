import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";

const Stack = createStackNavigator({
  Home: {
    screen: Home
  }
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
