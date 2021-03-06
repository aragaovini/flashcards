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
import { addNewCard } from "../actions/cards";
import uuidv1 from "uuid/v1";

class CardForm extends React.Component {
  state = {
    question: "Your question",
    answer: "answer here"
  };

  setCardToDeck = () => {
    if (this.isValid()) {
      const { deck, refreshDeck } = this.props.navigation.state.params;
      const { question, answer } = this.state;
      const { navigation, addCard } = this.props;
      const id = uuidv1();
      let card = {
        id,
        question,
        answer,
        result: null,
        answered: false
      };
      addCard(deck.id, card, () => {
        refreshDeck();
        navigation.navigate("DeckDetails", { deckId: deck.id });
      });
    }
  };

  isValid = () => {
    const { question, answer } = this.state;
    if (!question || !answer) {
      Vibration.vibrate(1000);
      Alert.alert(
        "Fields are required!",
        `Please, complete all required fields.`,
        [
          {
            text: "Ok"
          }
        ]
      );
      return false;
    }
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Add a new card</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderBottomWidth: 1 }}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderBottomWidth: 1 }}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />

        <View style={styles.containerButton}>
          <Button title="Save" onPress={() => this.setCardToDeck()} />
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
  addCard: (deckId, card, successCallback) =>
    dispatch(addNewCard(deckId, card, successCallback))
});

export default connect(null, MapDispatchToProps)(CardForm);
