import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserGroup } from '../actions';
import Header from '../components/Header';
import HomeOccupancy from '../components/HomeOccupancy';
import { PEWTER_BLUE, DARK_BLUE, MOONSTONE_BLUE } from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: 'white'
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

// MOVE TO UTILS FOLDER
function lightenDarkenColor(col, amt) {
  const num = parseInt(col, 16);
  const r = (num >> 16) + amt;
  const b = ((num >> 8) & 0x00ff) + amt;
  const g = (num & 0x0000ff) + amt;
  const newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
}

const items = [
  {
    name: 'Errands',
    icon: 'md-calendar',
    code: '#f39c12',
    numItems: '4 upcoming',
    route: ''
  },
  {
    name: 'Utilities',
    icon: 'md-outlet',
    code: '#f542f2',
    numItems: '4 items due',
    route: 'utilities'
  },
  {
    name: 'Payments',
    icon: 'md-cash',
    code: '#2ecc71',
    numItems: '4 items due',
    route: 'payments'
  },
  {
    name: 'Chores',
    icon: 'md-trash',
    code: MOONSTONE_BLUE,
    numItems: '4 items due',
    routes: 'chores'
  }
];

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const firstName = params ? params.firstName : null;
    const lastName = params ? params.lastName : null;
    const address = params ? params.address : null;
    return {
      header: () => {
        return <Header name={`${firstName} ${lastName}`} address={`${address}`} />;
      }
    };
  };

  componentDidMount() {
    this.props.getUserGroup(this.props.user);
    this.props.navigation.setParams({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      address: this.props.groupInfo.address
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.firstName && !this.props.navigation.state.params) {
  //     this.props.navigation.setParams({ firstName: this.props.firstName });
  //   }
  // }

  render() {
    const { groupInfo, firstName, lastName, navigation } = this.props;
    const lighterPewterBlue = `#${lightenDarkenColor(PEWTER_BLUE.slice(1), 55)}`;
    return (
      <View style={styles.container}>
        {/* <Header name={`${firstName} ${lastName}`} address={groupInfo.address} /> */}
        <HomeOccupancy />
        <View style={{ backgroundColor: lighterPewterBlue, flex: 1 }}>
          <FlatGrid
            itemDimension={130}
            items={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  navigation.navigate(item.route);
                }}
              >
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  <Ionicons name={item.icon} size={32} color={item.code} />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.numItems}</Text>
                </View>
              </TouchableOpacity>
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
