import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserGroup } from '../actions';
import HomeOccupancy from '../components/HomeOccupancy';
import Header from '../components/Header';
import { PEWTER_BLUE, DARK_BLUE, MOONSTONE_BLUE, LIGHT_SEA_GREEN, ORANGE } from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.19)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1
  },
  itemName: {
    fontSize: 18,
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
    code: ORANGE,
    route: 'errand'
  },
  {
    name: 'Payments',
    icon: 'md-cash',
    code: LIGHT_SEA_GREEN,
    route: 'payments'
  },
  {
    name: 'Chores',
    icon: 'md-trash',
    code: MOONSTONE_BLUE,
    route: 'chore'
  },
  {
    name: 'Chat',
    icon: 'ios-chatboxes',
    code: ORANGE,
    route: 'chat'
  }
];

class HomeScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const firstName = params ? params.firstName : null;
    const lastName = params ? params.lastName : null;
    const address = params ? params.address : null;
    const shortFormAddress = address ? address.split(',')[0] : '';
    const info = {
      firstName,
      lastName,
      address,
      shortFormAddress
    };
    return {
      safeAreaInsets: { top: 0 },
      header: () => {
        return (
          <Header
            style={{ backgroundColor: 'white' }}
            title={`${firstName} ${lastName}`}
            subtitle={`${shortFormAddress}`}
            info={info}
          />
        );
      },
      headerStyle: {
        backgroundColor: 'white',
        border: 'none',
        height: 100
      }
      // headerTitle: () => (
      //   <Text
      //     style={{ fontWeight: 'bold', textAlign: 'center' }}
      //   >{`${firstName} ${lastName}\n${shortFormAddress}`}</Text>
      // )
    };
  };

  componentDidMount() {
    const {
      firstName,
      lastName,
      groupInfo,
      getUserGroup,
      inGroup,
      username,
      user,
      navigation
    } = this.props;
    navigation.setParams({
      firstName,
      lastName,
      username
    });
    if (inGroup) {
      getUserGroup(user);
      navigation.setParams({
        address: groupInfo.address
      });
    }
  }

  render() {
    const { groupInfo, firstName, lastName, navigation } = this.props;
    const lighterPewterBlue = `#${lightenDarkenColor(PEWTER_BLUE.slice(1), 55)}`;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <HomeOccupancy />
          <Layout
            style={{
              backgroundColor: 'rgba(38, 84, 124, 0.175)',
              flex: 1,
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FlatGrid
              scrollEnabled={false}
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
                  </View>
                </TouchableOpacity>
              )}
            />
          </Layout>
        </Layout>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, user, groupInfo, inGroup } = auth;

  return { firstName, lastName, user, groupInfo, inGroup };
};
export default connect(mapStateToProps, { getUserGroup })(HomeScreen);
