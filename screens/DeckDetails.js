import React from "react";
import { StyleSheet, Text, View, Button, Animated } from "react-native";
import CardCounter from "../components/CardCounter";
import { getDeckById } from "../actions/decks";
import { connect } from "react-redux";

class DeckDetails extends React.Component {
  state = {
    deck: {
      title: "",
      cards: []
    },
    deckId: "",
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 700 }).start();
    const { deckId } = this.props.navigation.state.params;
    this.setState({ deckId });
    this.props.getDeck(deckId);
  }

  componentWillReceiveProps({ deck, deckId }) {
    this.setState({ deck });
  }

  refreshDeck() {
    this.props.getDeck(this.state.deckId);
  }

  render() {
    const { deck, opacity } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.appTitle}>{deck.title}</Text>
        <CardCounter
          style={styles.description}
          totalCards={deck.cards.length}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate("CardForm", {
              deck,
              refreshDeck: () => {
                this.refreshDeck();
              }
            });
          }}
          title="Add Card"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate("Quiz", { deckId: deck.id });
          }}
          title="Start Quiz"
        />
      </Animated.View>
    );
  }
}

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

const MapStateToProps = store => {
  return {
    deck: store.deck
  };
};

const MapDispatchToProps = dispatch => ({
  getDeck: id => dispatch(getDeckById(id))
});

export default connect(MapStateToProps, MapDispatchToProps)(DeckDetails);
