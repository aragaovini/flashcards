import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CardCounter from "./CardCounter";

export default class ListItem extends React.Component {
  render() {
    const { deckTitle, totalCards } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deckTitle}</Text>
        <Text>
          <CardCounter totalCards={totalCards} />
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
    borderBottomWidth: 1,
    borderColor: "#e2e2e2"
  },
  deckTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8
  }
});
