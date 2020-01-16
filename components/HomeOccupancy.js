import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Avatar from './Avatar';

const getHomeOccupancy = () => {
  // TODO: need to get dynamically
  return ['RA', 'SF', 'DP', 'MC', 'SD', 'SZ', 'MV', 'SP'];
};

// helper function to render a list of people who are home
const renderAvatars = () => {
  return getHomeOccupancy().map(user => {
    return <Avatar key={user} initials={user} />;
  });
};

const HomeOccupancy = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>Who's Home</Text>
      {/* will need to map over list of user's who are home;
              initials should by dynamic ofc. via .map() eventually
           */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderAvatars()}
      </ScrollView>
    </View>
  );
};

export default HomeOccupancy;
