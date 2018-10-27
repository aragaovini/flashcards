import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CardCounter from "../components/CardCounter";
import { getDeckById } from "../actions/decks";
import { connect } from "react-redux";

class DeckDetails extends React.Component {
  state = {
    deck: {
      title: "",
      cards: []
    },
    deckId: ""
  };

  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;
    this.setState({ deckId });
    this.props.getDeck(deckId);
  }

  componentWillReceiveProps({ deck, deckId }) {
    this.setState({ deck });
    this.props.getDeck(this.state.deckId);
  }

  render() {
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>{deck.title}</Text>
        <CardCounter
          style={styles.description}
          totalCards={deck.cards.length}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate("CardForm", { deck });
          }}
          title="Add Card"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate("Quiz", { deck });
          }}
          title="Start Quiz"
        />
      </View>
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
