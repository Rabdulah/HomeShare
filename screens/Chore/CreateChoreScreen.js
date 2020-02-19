import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Input as KittenInput, Text, Select } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { DARK_BLUE } from '../../styles/colours';

class CreateChoreScreen extends Component {
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
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Add Chore</Text>,
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('updatePayment');
          }}
        >
          <Ionicons
            name="md-create"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);

    this.firstInput = React.createRef();
    const { allUsersInGroup } = props;
    const users = allUsersInGroup.map(user => {
      return {
        text: user.name.firstName,
        id: user.id
      };
    });

    this.state = {
      users,
      selectedUsers: [],
      choreName: ''
    };
  }

  onChoreNameChange = choreName => {
    this.setState({ choreName });
  };

  setSelectedOption = user => { };

  createChore = chore => {
    const { navigation } = this.props;
    const choresRef = firebase.firestore().collection('chores');
    choresRef
      .add(chore)
      .then(() => {
        navigation.navigate('chore');
      })
      .catch(err => {
        console.log('err in creating chore', err);
      });
  };

  onCheckmarkPress = async () => {
    const { selectedUsers, choreName } = this.state;
    const { group } = this.props;

    // get user references
    const selectedUsersWithRef = await Promise.all(
      selectedUsers.map(async el => {
        const userRef = await firebase
          .firestore()
          .collection('users')
          .doc(el.id);

        return {
          count: 0,
          userRef
        };
      })
    );

    const newChore = {
      group,
      name: choreName,
      recurring: true,
      responsibility: selectedUsersWithRef
    };

    this.createChore(newChore);
  };

  render() {
    const { users, selectedUsers, choreName } = this.state;
    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          scrollEnabled={false}
        >
          <KittenInput
            label="Name"
            placeholder="Chore name"
            value={choreName}
            onChangeText={this.onChoreNameChange}
            style={styles.input}
          />
          <Select
            label="Assign"
            data={users}
            selectedOption={selectedUsers}
            onSelect={this.setSelectedOption}
            multiSelect
            style={styles.input}
          />
          <Layout
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '60%',
              margin: 20
            }}
          >
            <TouchableOpacity>
              <Ionicons name="md-close" size={40} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCheckmarkPress}>
              <Ionicons name="md-checkmark" size={40} color="green" />
            </TouchableOpacity>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '60%'
  }
});

const mapStateToProps = ({ auth }) => {
  const { allUsersInGroup, group } = auth;

  return { allUsersInGroup, group };
};
export default connect(mapStateToProps, null)(CreateChoreScreen);
