import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase';
import { DARK_BLUE } from '../../styles/colours';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    height: 40,
    lineHeight: 40
  },
  dateTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb'
  }
});

class CreateErrandScreen extends Component {
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
          <Text style={{ paddingHorizontal: 16 }}>Cancel</Text>
        </TouchableOpacity>
      );
    },
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Create Errand</Text>
    ),
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.getParam('onAdd')();
          }}
        >
          <Text style={{ paddingHorizontal: 16 }}>Add</Text>
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showDate: false,
      showTime: false,
      name: '',
      description: ''
    };
    this.descriptionInput = React.createRef();
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onAdd: this.onAdd
    });
  }

  onAdd = () => {
    const { name, description, date } = this.state;
    const { user, group } = this.props;

    // get owner reference
    const ownerRef = firebase
      .firestore()
      .collection('users')
      .doc(user);

    const newErrand = {
      attendants: [],
      date,
      description,
      group,
      name,
      owner: ownerRef
    };

    this.createErrand(newErrand);
  };

  createErrand = errand => {
    const { navigation } = this.props;
    const errandsRef = firebase.firestore().collection('errands');
    errandsRef
      .add(errand)
      .then(() => {
        navigation.navigate('errand');
      })
      .catch(err => {
        console.log('err in creating errand', err);
      });
  };

  setDate = date => {
    this.setState({ date });
  };

  onChange = (event, selectedDate) => {
    const { date } = this.state;
    const currentDate = selectedDate || date;
    this.setDate(currentDate);
  };

  onNameChange = name => {
    this.setState({ name });
  };

  onDescriptionChange = description => {
    this.setState({ description });
  };

  toggleShowDate = () => {
    const { showDate } = this.state;
    this.setState({ showDate: !showDate });
  };

  toggleShowTime = () => {
    const { showTime } = this.state;
    this.setState({ showTime: !showTime });
  };

  render() {
    const { date, showDate, showTime, name, description } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, paddingVertical: 15, backgroundColor: '#f0f0f0' }}
        behaviour="height"
      >
        <Layout
          style={{
            backgroundColor: '#f0f0f0'
          }}
        >
          <ScrollView
            contentContainerStyle={[
              {
                flexGrow: 1,
                alignItems: 'center',
                marginBottom: 36
              },
              styles.inputContainer
            ]}
            scrollEnabled
          >
            <Input
              placeholder="Name"
              inputContainerStyle={{ borderBottomColor: '#dbdbdb' }}
              value={name}
              onChangeText={this.onNameChange}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.descriptionInput.current.focus();
              }}
            />
            <Input
              placeholder="Description"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={description}
              onChangeText={this.onDescriptionChange}
              ref={this.descriptionInput}
            />
          </ScrollView>

          <Layout style={[styles.inputContainer]}>
            <Layout
              style={[
                {
                  marginHorizontal: 10,
                  borderBottomColor: '#dbdbdb',
                  borderBottomWidth: 1
                }
              ]}
            >
              <TouchableOpacity onPress={this.toggleShowDate}>
                <Layout style={styles.dateTime}>
                  <Text style={styles.text}>Date:</Text>
                  <Text style={styles.text}>{moment(date).format('MMMM D, YYYY')}</Text>
                </Layout>
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  testID="datePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </Layout>
            <Layout
              style={{
                marginHorizontal: 10
              }}
            >
              <TouchableOpacity onPress={this.toggleShowTime}>
                <Layout style={styles.dateTime}>
                  <Text style={styles.text}>Time:</Text>
                  <Text style={styles.text}>{moment(date).format('h:mm a')}</Text>
                </Layout>
              </TouchableOpacity>
              {showTime && (
                <DateTimePicker
                  testID="timePicker"
                  value={date}
                  mode="time"
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </Layout>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { group, user } = auth;

  return { group, user };
};
export default connect(mapStateToProps, {})(CreateErrandScreen);
