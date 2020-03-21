import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import {
  emailChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors,
  leaveGroup,
  getInvites,
  acceptInvite
} from '../actions';
import AuthStyles from '../styles/auth';
import { DARK_BLUE, LIGHT_GREY_TEXT } from '../styles/colours';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '700',
    marginBottom: 12
  },
  rowItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 10
  },
  rowItemRight: {
    color: LIGHT_GREY_TEXT
  },
  buttonStyle: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: DARK_BLUE,
    width: '95%'
  }
});
class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white'
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home');
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
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Profile</Text>
  });

  componentDidMount() {
    this.subscribeToInvites(this.props);
  }

  subscribeToInvites = props => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(props.user)
      .onSnapshot(doc => {
        this.props.getInvites(doc.data().pendingInvites);
      });
  };

  componentWillUnmount() {
    // May need to unsubscribe at some point
    // unsubscribe();
  }

  renderAddress = address => {
    const addressSplit = address.match(/.{1,25}/g);
    const newAddress = addressSplit.reduce((totalStr, el, index) => {
      if (index !== addressSplit.length - 1) {
        return `${totalStr + el}\n`;
      }
      return `${totalStr + el}`;
    }, '');
    return newAddress;
  };

  renderGroupInfo = () => {
    if (this.props.inGroup) {
      const { name, address } = this.props.groupInfo;
      return (
        <Layout style={{ flex: 1 }}>
          <Text style={styles.title}>Group Details</Text>
          <Layout style={[styles.rowItem]}>
            <Text>Name:</Text>
            <Text style={styles.rowItemRight}> {name}</Text>
          </Layout>
          <Layout style={[styles.rowItem]}>
            <Text>Address:</Text>
            <Text style={styles.rowItemRight}>{this.renderAddress(address)}</Text>
          </Layout>
        </Layout>
      );
    }
  };

  renderPendingInvites = () => {
    // Show pending invites only if you have them and you are not in a group
    if (!this.props.inGroup && this.props.pendingInvites.length) {
      return (
        <View>
          <Text style={AuthStyles.subTitle}>Pending Invites</Text>
          <List data={this.props.pendingInvites} renderItem={this.renderInvite} />
        </View>
      );
    }
  };

  acceptInvitation = groupRef => {
    this.props.acceptInvite(groupRef);
  };

  icon = () => {
    return <AntDesign name="plus" size={24} />;
  };

  renderInvite = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        description={item.address}
        onPress={() => this.acceptInvitation(item.ref)}
        icon={this.icon}
        style={{
          paddingVertical: 15,
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 1
        }}
      />
    );
  };

  renderGroupButton = () => {
    let title;
    const width = { width: '95%' };
    if (this.props.inGroup) {
      title = 'Leave Group';
    } else {
      title = 'Create Group';
      width.width = '100%';
    }
    return (
      <Layout style={{ flex: 1 }}>
        <Button
          title={title}
          buttonStyle={[styles.buttonStyle, width]}
          titleStyle={{
            fontSize: 20
          }}
          onPress={this.onButtonPressGroup}
        />
      </Layout>
    );
  };

  renderInviteButton = () => {
    if (this.props.inGroup) {
      return (
        <Layout style={{ flex: 1, alignSelf: 'flex-end' }}>
          <Button
            title="Send Invite"
            buttonStyle={[styles.buttonStyle, { alignSelf: 'flex-end' }]}
            titleStyle={{
              fontSize: 20
            }}
            onPress={this.onButtonPressInvite}
          />
        </Layout>
      );
    }
  };

  onButtonPressGroup = () => {
    if (this.props.inGroup) {
      this.props.leaveGroup();
    } else {
      this.props.navigation.navigate('createGroup');
    }
  };

  onButtonPressInvite = () => {
    this.props.navigation.navigate('sendInvite');
  };

  render() {
    const { firstName, lastName, email, username } = this.props;
    return (
      <Layout style={[AuthStyles.container, { flex: 1, flexDirection: 'column' }]}>
        <Layout style={{ flex: 1 }}>
          <Text style={styles.title}>User Profile</Text>
          <Layout style={[styles.rowItem]}>
            <Text>First Name: </Text>
            <Text style={styles.rowItemRight}>{firstName}</Text>
          </Layout>
          <Layout style={[styles.rowItem]}>
            <Text>Last Name: </Text>
            <Text style={styles.rowItemRight}>{lastName}</Text>
          </Layout>
          <Layout style={[styles.rowItem]}>
            <Text>Email:</Text>
            <Text style={styles.rowItemRight}> {email}</Text>
          </Layout>
          <Layout style={[styles.rowItem]}>
            <Text>Username:</Text>
            <Text style={styles.rowItemRight}>{username}</Text>
          </Layout>
        </Layout>
        <Layout style={{ flex: 1 }}>
          {this.renderGroupInfo()}
          <Layout
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {this.renderGroupButton()}
            {this.renderInviteButton()}
          </Layout>
          {this.renderPendingInvites()}
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    email,
    loading,
    firstName,
    lastName,
    username,
    user,
    inGroup,
    groupInfo,
    pendingInvites
  } = auth;

  return {
    email,
    loading,
    firstName,
    lastName,
    username,
    user,
    inGroup,
    groupInfo,
    pendingInvites
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors,
  leaveGroup,
  getInvites,
  acceptInvite
})(ProfileScreen);
