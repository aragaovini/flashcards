import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Vibration,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { insertDeck } from "../actions/decks";
import uuidv1 from "uuid/v1";

class DeckForm extends React.Component {
  state = {
    deckName: "My deck"
  };

  saveDeck = () => {
    if (this.isValid()) {
      const { deckName } = this.state;
      const id = uuidv1();
      let deck = {
        id,
        title: deckName,
        cards: []
      };

      this.props.saveDeck(deck, () => {
        this.setState({ deckName: "" });
        this.props.navigation.navigate("DeckDetails", {
          deckId: id
        });
      });
    }
  };

  isValid = () => {
    const { deckName } = this.state;
    if (!deckName) {
      Vibration.vibrate(1000);
      Alert.alert("Deck's name is required!", `Please, complete it.`, [
        {
          text: "Ok"
        }
      ]);
      return false;
    }
    return true;
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

const MapDispatchToProps = dispatch => ({
  saveDeck: (deck, successCallback) =>
    dispatch(insertDeck(deck, successCallback))
});

export default connect(null, MapDispatchToProps)(DeckForm);
