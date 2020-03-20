import React from 'react';
import { Card, Text, Layout } from '@ui-kitten/components';

const HeaderCard = ({ title, subtitle }) => {
  return (
    <Card
      style={{
        marginBottom: 35,
        height: 120,
        justifyContent: 'center',
        borderWidth: 0,
        borderBottomWidth: 1,
        marginLeft: 0,
        paddingLeft: 0
      }}
    >
      <Text
        style={{
          fontSize: 40,
          lineHeight: 40,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Text>
      <Text>{subtitle}</Text>
    </Card>
  );
};

export default HeaderCard;
