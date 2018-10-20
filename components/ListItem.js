import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class App extends React.Component {
  render() {
    const { deckTitle, totalCards } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deckTitle}</Text>
        <Text>
          {totalCards} {totalCards > 1 ? "cards" : "card"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: "flex-start",
    borderBottomWidth: 1
  },
  deckTitle: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 8
  }
});
