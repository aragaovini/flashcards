import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ListItem from "../components/ListItem";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>Flashcards</Text>
        <View style={styles.containerButton}>
          <Button
            title="Add Deck"
            style={styles.buttonDefault}
            onPress={() => {}}
          />
        </View>
        <ListItem deckTitle="teste" totalCards={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 28,
    paddingTop: 36,
    flex: 1
  },
  containerButton: {
    alignItems: "flex-start"
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold"
  },
  buttonDefault: {
    marginTop: 28,
    padding: 16,
    borderRadius: 6,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: "#448aff",
    alignItems: "flex-start"
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  }
});
