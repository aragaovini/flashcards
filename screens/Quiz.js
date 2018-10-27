import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CORRECT, INCORRECT } from "../constants/quiz";
import { connect } from "react-redux";
import { ansWerCard } from "../actions/cards";
import { getDeckById } from "../actions/decks";

class Quiz extends React.Component {
  state = {
    currentQuestion: {},
    currentPosition: 0,
    deck: {},
    showAnswer: false
  };

  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;
    this.props.getDeck(deckId);
  }

  componentWillReceiveProps({ deck }) {
    this.setState({ deck }, () => {
      this.getQuestion();
    });
  }

  getQuestion() {
    const { deck } = this.state;
    console.log(deck.cards);
    const currentQuestion =
      deck.cards &&
      deck.cards.find((question, index) => {
        if (!question.answered) {
          this.setState({
            currentQuestion: question,
            currentPosition: index + 1
          });
        }
        return !question.answered;
      });
    if (!currentQuestion) {
      this.props.navigation.goBack();
    }
  }

  answerQuestion(answer) {
    const { saveAnswer } = this.props;
    const { currentQuestion, deck } = this.state;
    currentQuestion.answered = true;
    currentQuestion.result = answer;
    saveAnswer(currentQuestion, deck.id, () => {
      this.getQuestion();
    });
  }

  getNextQuestion() {
    const { deck } = this.state;
    if (deck.cards.length === currentPosition + 1) {
      this.props.navigation.navigate("DeckDetails", { deckId: deck.id });
    }
  }

  render() {
    const { deck, currentQuestion, showAnswer, currentPosition } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>Quiz: {deck.title}</Text>

        {deck.cards && (
          <Text>
            {currentPosition}/{deck.cards.length}
          </Text>
        )}

        <Text>{currentQuestion.question}</Text>
        {!showAnswer && (
          <Button
            title="Show Answer"
            onPress={() => this.setState({ showAnswer: true })}
          />
        )}

        {showAnswer && <Text>{currentQuestion.answer}</Text>}

        <Button
          disabled={!showAnswer}
          title="Incorrect"
          onPress={() => this.answerQuestion(INCORRECT)}
        />
        <Button
          disabled={!showAnswer}
          title="Correct"
          onPress={() => this.answerQuestion(CORRECT)}
        />
      </View>
    );
  }
}

const MapStateToProps = store => {
  return {
    deck: store.deck
  };
};

const MapDispatchToProps = dispatch => ({
  saveAnswer: (card, deckId, callback) =>
    dispatch(ansWerCard(card, deckId, callback)),
  getDeck: (id, callback) => dispatch(getDeckById(id, callback))
});

export default connect(MapStateToProps, MapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    paddingTop: 36,
    flex: 1
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold"
  },
  description: {
    marginTop: 12
  }
});
