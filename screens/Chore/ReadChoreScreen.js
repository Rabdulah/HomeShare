import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { retrieveChores, viewChore } from '../../actions';
import CustomBarChart from '../../components/CustomBarChart';
import { DARK_BLUE } from '../../styles/colours';

class ReadChoreScreen extends Component {
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
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Chore Details</Text>
  });

  getData = () => {
    const { responsibility } = this.props.currentChore;
    const data = responsibility.map(user => {
      return user.count;
    });

    return data;
  };

  render() {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>{this.props.currentChore.name}</Text>
        <CustomBarChart data={this.props.currentChore.responsibility} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ chore }) => {
  const { currentChore } = chore;

  return { currentChore };
};
export default connect(mapStateToProps, { retrieveChores })(ReadChoreScreen);
