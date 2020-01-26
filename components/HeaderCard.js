import React from 'react';
import { Card, Text } from '@ui-kitten/components';

const HeaderCard = ({ title, subtitle }) => {
  return (
    <Card
      style={{
        marginBottom: 20,
        height: 120,
        justifyContent: 'center'
      }}
    >
      <Text category="h1">{title}</Text>
      <Text>{subtitle}</Text>
    </Card>
  );
};

export default HeaderCard;
