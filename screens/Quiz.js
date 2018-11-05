import React from "react";
import { StyleSheet, Text, View, Button, Animated } from "react-native";
import { CORRECT, INCORRECT } from "../constants/quiz";
import { connect } from "react-redux";
import { answerCard, resetQuiz } from "../actions/cards";
import { getDeckById } from "../actions/decks";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

class Quiz extends React.Component {
  state = {
    currentQuestion: {},
    currentPosition: 0,
    deck: {},
    showAnswer: false,
    score: 0,
    showScore: false,
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    const { opacity } = this.state;
    const { deckId } = this.props.navigation.state.params;
    this.props.getDeck(deckId);
    Animated.timing(opacity, { toValue: 1, duration: 700 }).start();
  }

  componentWillReceiveProps({ deck }) {
    this.setState({ deck }, () => {
      this.getQuestion();
    });
  }

  resetQuizData() {
    this.setState(
      {
        currentQuestion: {},
        currentPosition: 0,
        showAnswer: false,
        score: 0,
        showScore: false,
        opacity: new Animated.Value(0)
      },
      () => {
        const { deck, opacity } = this.state;
        this.getQuestion();
        this.props.getDeck(deck.id);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700
        }).start();
      }
    );
  }

  getQuestion() {
    const { deck } = this.state;
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
      this.calculateScore();
    }
  }

  answerQuestion(answer) {
    this.setState({ showAnswer: false });
    const { saveAnswer } = this.props;
    const { currentQuestion, deck } = this.state;
    currentQuestion.answered = true;
    currentQuestion.result = answer;
    saveAnswer(currentQuestion, deck.id, () => {
      this.getNextQuestion();
      clearLocalNotification().then(setLocalNotification());
    });
  }

  getNextQuestion() {
    const { deck, currentPosition } = this.state;
    if (deck.cards.length === currentPosition) {
      this.calculateScore();
      return false;
    }
    const nextPosition = currentPosition + 1;

    this.setState({
      currentPosition: nextPosition,
      currentQuestion: deck.cards[nextPosition - 1]
    });
  }

  calculateScore() {
    const { deck } = this.state;
    const correctSum = deck.cards.filter(card => {
      return card.result === CORRECT;
    }).length;
    const score = (correctSum / deck.cards.length * 100).toFixed(0);
    this.setState({ score, showScore: true });
  }

  backToDeck() {
    const { deck } = this.state;
    this.props.navigation.navigate("DeckDetails", { deckId: deck.id });
  }

  restartDeckQuiz() {
    const { restartQuiz } = this.props;
    const { deck } = this.state;
    restartQuiz(deck.id, () => {
      this.resetQuizData();
    });
  }

  render() {
    const {
      deck,
      currentQuestion,
      showAnswer,
      currentPosition,
      score,
      showScore,
      opacity
    } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.appTitle}>Quiz: {deck.title}</Text>

        {!showScore && (
          <View>
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
        )}

        {showScore && (
          <View>
            <Text>{score}%</Text>
            <Text>You answered {deck.cards.length} questions!</Text>
            <Button
              title="Restart Quiz"
              onPress={() => this.restartDeckQuiz()}
            />
            <Button title="Back to Deck" onPress={() => this.backToDeck()} />
          </View>
        )}
      </Animated.View>
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
    dispatch(answerCard(card, deckId, callback)),
  getDeck: (id, callback) => dispatch(getDeckById(id, callback)),
  restartQuiz: (deckId, callback) => dispatch(resetQuiz(deckId, callback))
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
