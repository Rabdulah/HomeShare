import React from 'react';
import { View } from 'react-native';
import { Icon, Button, Layout, Card, Text } from '@ui-kitten/components';

const HeaderCard = () => {
  return (
    <Card
      style={{
        marginBottom: 20,
        height: 120,
        justifyContent: 'center'
      }}
    >
      <Text category="h1">$90</Text>
      <Text>is owed to you.</Text>
    </Card>
  );
};

export default HeaderCard;
