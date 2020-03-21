import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DARK_BLUE } from '../styles/colours';

import Avatar from './Avatar';

const getHomeOccupancy = () => {
  // TODO: need to get dynamically
  return [
    { initials: 'RA', firstName: 'ramzi' },
    { initials: 'SD', firstName: 'spencer' },
    { initials: 'MC', firstName: 'matt' }
  ];
};

// helper function to render a list of people who are home
const renderAvatars = () => {
  return getHomeOccupancy().map(user => {
    return (
      <Avatar
        key={user.firstName}
        initials={user.initials}
        firstName={user.firstName}
        showFirstName
      />
    );
  });
};

const HomeOccupancy = () => {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ paddingBottom: 5, fontWeight: 'bold', color: DARK_BLUE }}>Recently Home</Text>
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
