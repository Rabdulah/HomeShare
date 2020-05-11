import React from 'react';
import { Card, Text, Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BACKGROUND_LIGHT_GREY } from '../styles/colours';

const renderAmount = amount => {
  let str = '';
  if (amount === 0) {
    return 'No action required!';
  }
  if (amount < 0) {
    str += 'You owe $';
  } else {
    str += 'You are owed $';
  }

  return (str += Math.abs(amount).toString());
};

const ItemCard = ({ cost, name, onPress, id, owner, amount }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(id);
      }}
    >
      <Layout
        style={{
          marginBottom: 10,
          paddingVertical: 5,
          borderWidth: 0,
          backgroundColor: BACKGROUND_LIGHT_GREY,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 90,
          padding: 16,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25, lineHeight: 25, flex: 1 }}>
          ${cost}
          {'\n'}
          <Text>
            <Text>{renderAmount(amount)}</Text>
          </Text>
        </Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>
          {owner.name.firstName} bought:
          {'\n'}
          <Text>{name}</Text>
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default ItemCard;
