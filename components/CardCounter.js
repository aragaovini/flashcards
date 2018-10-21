import React from "react";
import { Text, View } from "react-native";

class CardCounter extends React.Component {
  render() {
    const { totalCards } = this.props;
    return (
      <View>
        <Text>
          {totalCards} {totalCards > 1 ? "cards" : "card"}
        </Text>
      </View>
    );
  }
}

export default CardCounter;
