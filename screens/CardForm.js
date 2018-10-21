import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { addNewCard } from "../actions/cards";

class CardForm extends React.Component {
  state = {
    question: "Your question",
    answer: "answer here"
  };

  setCardToDeck = () => {
    const { deck } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    const { navigation, addCard } = this.props;
    let card = {
      question,
      answer
    };
    addCard(deck.id, card, () => {
      navigation.navigate("DeckDetails", { deckId: deck.id });
    });
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
