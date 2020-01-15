import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getUserGroup } from '../actions';
import Header from '../components/Header';
import Avatar from '../components/Avatar';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getUserGroup(this.props.user);
  }

  render() {
    const { groupInfo, firstName, lastName } = this.props;
    return (
      <View style={styles.container}>
        <Header name={`${firstName} ${lastName}`} address={groupInfo.address} />
        <View>
          <Text>Who's Home</Text>
          {/* will need to map over list of user's who are home;
              initials should by dynamic ofc. via .map() eventually
           */}
          <Avatar initials="mc" />
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
