import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { retrieveChores, viewChore } from '../../actions';
import CustomBarChart from '../../components/CustomBarChart';

class ReadChoreScreen extends Component {
  render() {
    const data = [29, 30, 70, 50, 34, 98, 51, 35, 53, 24, 50];

    return (
      <View>
        <Text>hello</Text>
        <CustomBarChart />
      </View>
    );
  }
}

const mapStateToProps = ({ chore }) => {
  const { currentChore } = chore;

  return { currentChore };
};
export default connect(mapStateToProps, { retrieveChores })(ReadChoreScreen);
