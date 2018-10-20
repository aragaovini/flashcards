import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getDecks } from "../api";
import ListItem from "../components/ListItem";
import { connect } from "react-redux";
import { getAllDecks } from "../actions/decks";

class Home extends React.Component {
  state = {
    decks: []
  };

  componentDidMount() {
    this.props.getDecks();
  }

  componentWillReceiveProps = ({ decks }) => {
    this.setState({ decks });
  };

  render() {
    const { decks } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>Flashcards</Text>
        <View style={styles.containerButton}>
          <Button
            title="Add Deck"
            style={styles.buttonDefault}
            onPress={() => this.props.navigation.navigate("DeckForm")}
          />
        </View>
        {decks &&
          decks.length &&
          decks.map((deck, index) => {
            return (
              <ListItem
                key={index}
                deckTitle={deck.title}
                totalCards={deck.cards.length}
              />
            );
          })}
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
  containerButton: {
    alignItems: "flex-start"
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold"
  },
  buttonDefault: {
    marginTop: 28,
    backgroundColor: "#448aff",
    alignItems: "flex-start"
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  }
});

const MapStateToProps = store => {
  return {
    decks: store.decks
  };
};

const MapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getAllDecks())
});

export default connect(MapStateToProps, MapDispatchToProps)(Home);
