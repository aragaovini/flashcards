import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Vibration,
  Alert
} from "react-native";
import { getDecks } from "../api";
import ListItem from "../components/ListItem";
import { connect } from "react-redux";
import { getAllDecks, deleteDeckById } from "../actions/decks";

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

  askToRemove = deck => {
    const { deleteDeck } = this.props;
    Vibration.vibrate(1000);
    Alert.alert(
      "Would you like to remove this deck?",
      `The ${deck.title} will be lost forever.`,
      [
        {
          text: "No!"
        },
        {
          text: "Yes",
          onPress: () => deleteDeck(deck.id)
        }
      ]
    );
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
              <TouchableHighlight
                key={index}
                onLongPress={() => {
                  this.askToRemove(deck);
                }}
              >
                <ListItem
                  deckTitle={deck.title}
                  totalCards={deck.cards.length}
                />
              </TouchableHighlight>
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
  getDecks: () => dispatch(getAllDecks()),
  deleteDeck: id => dispatch(deleteDeckById(id))
});

export default connect(MapStateToProps, MapDispatchToProps)(Home);
