import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { Layout, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase';

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
    borderBottomColor: '#dbdbdb',
    width: '100%'
  }
});

class UpdateErrandScreen extends Component {
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
            navigation.getParam('onSave')();
          }}
        >
          <Text style={{ paddingHorizontal: 16 }}>Save</Text>
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
      onSave: this.onSave
    });

    const { currentErrand } = this.props;
    this.setState({
      date: moment.unix(currentErrand.date).toDate(),
      name: currentErrand.name,
      description: currentErrand.description
    });
  }

  updateErrand = updatedFields => {
    const { currentErrand, navigation } = this.props;

    firebase
      .firestore()
      .collection('errands')
      .doc(currentErrand.id)
      .update(updatedFields)
      .then(() => {
        navigation.navigate('errand');
      });
  };

  onSave = async () => {
    const { name, description, date } = this.state;
    const { user, group } = this.props;

    const updatedFields = {
      name,
      description,
      date
    };

    this.updateErrand(updatedFields);
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
    console.log('woof', showDate);
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            marginBottom: 36
          }}
          scrollEnabled
        >
          <Layout
            style={{
              width: '100%',
              marginBottom: 36,
              borderBottomColor: '#dbdbdb',
              borderBottomWidth: 1,
              borderTopColor: '#dbdbdb',
              borderTopWidth: 1
            }}
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
          </Layout>
          <Layout style={styles.inputContainer}>
            <Layout
              style={[
                {
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#dbdbdb'
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ errand, auth }) => {
  const { currentErrand } = errand;
  const { group, user } = auth;

  return { currentErrand, group, user };
};
export default connect(mapStateToProps, null)(UpdateErrandScreen);
