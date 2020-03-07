import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Layout, Text, Input as KittenInput } from '@ui-kitten/components';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { DARK_BLUE } from '../../styles/colours';

const styles = StyleSheet.create({
  input: {
    width: '60%'
  },
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
        <TouchableOpacity onPress={() => { }}>
          <Text style={{ paddingHorizontal: 16 }}>Add</Text>
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = { date: new Date(), showDate: false, showTime: false };
  }

  setDate = date => {
    this.setState({ date });
  };

  onChange = (event, selectedDate) => {
    const { date } = this.state;
    const currentDate = selectedDate || date;
    this.setDate(currentDate);
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
    const { date, showDate, showTime } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, paddingVertical: 15, backgroundColor: '#f0f0f0' }}
        behaviour="height"
        enabled
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
            <Input placeholder="Name" inputContainerStyle={{ borderBottomColor: '#dbdbdb' }} />
            <Input placeholder="Description" inputContainerStyle={{ borderBottomWidth: 0 }} />
          </ScrollView>

          <Layout style={{ marginBottom: 36 }}>
            <Layout
              style={[
                {
                  width: '100%',
                  paddingHorizontal: 10
                },
                styles.inputContainer
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
            <Layout style={{ width: '100%', paddingHorizontal: 10 }}>
              <TouchableOpacity onPress={this.toggleShowTime}>
                <Layout style={styles.dateTime}>
                  <Text style={styles.text}>Time:</Text>
                  <Text style={styles.text}>{moment(date).format('h:mm a')}</Text>
                </Layout>
              </TouchableOpacity>
              {/* date */}
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

export default CreateErrandScreen;
