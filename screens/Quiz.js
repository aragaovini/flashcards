import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Quiz extends React.Component {
  state = {
    currentQuestion: {},
    currentPosition: 0,
    deck: {},
    showAnswer: false
  };

  componentDidMount() {
    const { deck } = this.props.navigation.state.params;
    this.setState({ deck }, () => {
      this.startQuiz();
    });
  }

  startQuiz() {
    const { deck } = this.state;

    deck.cards &&
      deck.cards.every((card, index) => {
        if (!card.question.answered) {
          this.setState({ currentQuestion: card, currentPosition: index + 1 });
          return false;
        }
      });
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
          onPress={() => this.setState({ showAnswer: true })}
        />
        <Button
          disabled={!showAnswer}
          title="Correct"
          onPress={() => this.setState({ showAnswer: true })}
        />
      </View>
    );
  }
}

export default Quiz;

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
