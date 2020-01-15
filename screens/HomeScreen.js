import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';

import { getUserGroup } from '../actions';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import { PEWTER_BLUE, DARK_BLUE, MOONSTONE_BLUE } from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 20,
    // paddingHorizontal: 10
  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: DARK_BLUE,
    fontWeight: '600'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: DARK_BLUE
  }
});

function lightenDarkenColor(col, amt) {
  const num = parseInt(col, 16);
  const r = (num >> 16) + amt;
  const b = ((num >> 8) & 0x00ff) + amt;
  const g = (num & 0x0000ff) + amt;
  const newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
}

const usersAtHome = ['RA', 'SF', 'DP'];

const items = [
  {
    name: 'Errands',
    icon: 'md-calendar',
    code: '#f39c12',
    numItems: '4 upcoming'
  },
  {
    name: 'Utilities',
    icon: 'md-outlet',
    code: '#f542f2',
    numItems: '4 items due'
  },
  {
    name: 'Payments',
    icon: 'md-cash',
    code: '#2ecc71',
    numItems: '4 items due'
  },
  {
    name: 'Chores',
    icon: 'md-trash',
    code: MOONSTONE_BLUE,
    numItems: '4 items due'
  }
];

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getUserGroup(this.props.user);
  }

  // helper function to render a list of people who are home
  renderAvatars = () => {
    return usersAtHome.map(user => {
      return <Avatar key={user} initials={user} />;
    });
  };

  render() {
    const { groupInfo, firstName, lastName } = this.props;
    const lighterPewterBlue = `#${lightenDarkenColor(PEWTER_BLUE.slice(1), 55)}`;
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Header name={`${firstName} ${lastName}`} address={groupInfo.address} />
        <View style={{ padding: 10 }}>
          <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>Who's Home</Text>
          {/* will need to map over list of user's who are home;
              initials should by dynamic ofc. via .map() eventually
           */}
          <View style={{ flexDirection: 'row' }}>{this.renderAvatars()}</View>
        </View>

        <View style={{ backgroundColor: lighterPewterBlue, flex: 1 }}>
          <FlatGrid
            itemDimension={130}
            items={items}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  <Ionicons name={item.icon} size={32} color={item.code} />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.numItems}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, user, groupInfo } = auth;

  return { firstName, lastName, user, groupInfo };
};
export default connect(mapStateToProps, { getUserGroup })(HomeScreen);
