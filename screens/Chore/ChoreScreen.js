import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import { DARK_BLUE } from '../../styles/colours';

class ChoreScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white'
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    },
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Chores</Text>,
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('addChore');
          }}
        >
          <Ionicons
            name="md-add"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    }
  });

  render() {
    return (
      <Layout>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
        <Text>ChoreScreen</Text>
      </Layout>
    );
  }
}

export default ChoreScreen;
