import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { addDeck } from "../api";

export default class AddDeck extends React.Component {
  state = {
    deckName: "My deck"
  };

  saveDeck = () => {
    const { deckName } = this.state;
    let deck = {
      title: deckName,
      cards: []
    };

    addDeck(deck).then(() => {
      this.setState({ deckName: "" });
      this.props.navigation.navigate("Home");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Add a new deck</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderBottomWidth: 1 }}
          onChangeText={deckName => this.setState({ deckName })}
          value={this.state.deckName}
        />
        <View style={styles.containerButton}>
          <Button title="Save" onPress={() => this.saveDeck()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 28,
    padding: 8
  },
  containerButton: {
    alignItems: "flex-start"
  },
  inputLabel: {
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
