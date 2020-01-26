import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ItemCard = ({ cost, name, onPress, _id }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(_id);
      }}
    >
      <Card style={{ marginBottom: 10 }}>
        <Text>${cost}</Text>
        <Text>{name}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default ItemCard;
