import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Text, Input as KittenInput, Select } from '@ui-kitten/components';
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { DARK_BLUE } from '../../styles/colours';

class UpdateChoreScreen extends Component {
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
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Edit Chore</Text>
  });

  constructor(props) {
    super(props);

    const choreCopy = JSON.parse(JSON.stringify(this.props.currentChore));

    const users = choreCopy.responsibility.map(user => {
      return {
        text: user.user.name.firstName,
        id: user.user.id
      };
    });
    this.state = {
      users,
      selectedUsers: [...users],
      choreName: choreCopy.name
    };
  }

  setSelectedOption = user => { };

  render() {
    const { choreName, users, selectedUsers } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="height" enabled>
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
              onChangeText={this.onDescriptionChange}
              ref={this.firstInput}
              style={{
                fontSize: 16,
                backgroundColor: '#f0eeee',
                width: '60%'
              }}
              size="large"
              value={choreName}
              autoCorrect={false}
            />
            <Select
              label="Assign"
              data={users}
              selectedOption={selectedUsers}
              onSelect={this.setSelectedOption}
              multiSelect
              style={styles.input}
            />
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '60%'
  }
});

const mapStateToProps = ({ chore }) => {
  const { currentChore } = chore;

  return { currentChore };
};
export default connect(mapStateToProps, null)(UpdateChoreScreen);
