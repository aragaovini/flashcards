import React from "react";
import { Text, View } from "react-native";

const CardCounter = props => {
  const { totalCards } = props;
  return (
    <View>
      <Text>
        {totalCards} {totalCards > 1 ? "cards" : "card"}
      </Text>
    </View>
  );
};

export default CardCounter;
