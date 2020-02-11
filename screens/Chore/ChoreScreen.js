import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, List, ListItem } from '@ui-kitten/components';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { DARK_BLUE } from '../../styles/colours';
import { retrieveChores } from '../../actions';

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

  componentDidMount() {
    this.retrieveChoresHelper();
  }

  retrieveChoresHelper = async () => {
    const { group } = this.props;

    const choresSnapshot = await firebase
      .firestore()
      .collection('chores')
      .where('group', '==', group)
      .get()
      .then(async snapshot => {
        const choresList = await Promise.all(
          snapshot.docs.map(async doc => {
            const { name, recurring } = doc.data();
            let { responsibility } = doc.data();
            const userList = [];

            // get all users responsible for a chore
            responsibility = await Promise.all(
              /* 
                resp = one of the user(s) responsible
                for a chore.
              */
              responsibility.map(async resp => {
                console.log('hello', resp.userRef.id);
                const u = await firebase
                  .firestore()
                  .collection('users')
                  .doc(resp.userRef.id)
                  .get();

                const userData = u.data();
                userList.push({
                  address: userData.address,
                  email: userData.email,
                  name: userData.name,
                  username: userData.username,
                  id: u.id
                });
                return {
                  address: userData.address,
                  email: userData.email,
                  name: userData.name,
                  username: userData.username
                };
              })
            );

            return {
              id: doc.id,
              name,
              recurring,
              responsibility: userList
            };
          })
        );
        this.props.retrieveChores(choresList);
      });
  };

  renderChoreList = ({ item }) => {
    return (
      <ListItem
        title={`${item.name}`}
        style={{
          height: 75,
          lineHeight: 75,
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 1
        }}
        titleStyle={{
          fontSize: 20,
          lineHeight: 20,
          fontWeight: 'normal'
        }}
        description="Matt's turn"
        icon={() => {
          return (
            <>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: 35,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={40}
                  style={{ fontWeight: '100' }}
                />
              </TouchableOpacity>
            </>
          );
        }}
      />
    );
  };

  render() {
    const { chores } = this.props;
    return (
      <>
        {chores !== null ? (
          <Layout>
            <ListItem
              title="Todo"
              titleStyle={{ fontSize: 20 }}
              style={{
                paddingVertical: 15,
                borderBottomColor: '#e3e3e3',
                borderBottomWidth: 1
              }}
            />
            <List
              data={chores}
              renderItem={this.renderChoreList}
              style={{ backgroundColor: 'white' }}
            />
          </Layout>
        ) : (
          <Layout>
            <Text>Loading...</Text>
          </Layout>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth, chore }) => {
  const { group, user } = auth;
  const { chores } = chore;
  return { group, user, chores };
};
export default connect(mapStateToProps, { retrieveChores })(ChoreScreen);
