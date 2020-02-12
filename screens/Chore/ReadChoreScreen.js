import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';

class ReadChoreScreen extends Component {
  render() {
    return (
      <Layout>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
        <Text>ReadChoreScreen</Text>
      </Layout>
    );
  }
}

const mapStateToProps = ({ chore }) => {
  const { currentChore } = chore;

  return { currentChore };
};
export default connect(mapStateToProps, {})(ReadChoreScreen);
