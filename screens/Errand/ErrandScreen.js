import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { DARK_BLUE } from '../../styles/colours';

const FORMAT = 'YYYY-MM-DD';
const TODAY = moment().format(FORMAT);

class ErrandScreen extends Component {
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
    headerTitle: () => <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Errands</Text>,
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('createChore');
          }}
        >
          <Ionicons name="md-add" size={30} color={DARK_BLUE} style={{ paddingHorizontal: 16 }} />
        </TouchableOpacity>
      );
    }
  });

  componentDidMount() { }

  render() {
    return (
      <Layout>
        <Calendar
          // Specify style for calendar container element. Default = {}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 350
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150'
          }}
          // Initially visible month. Default = Date()
          minDate={TODAY}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat="MMMM yyyy"
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
      </Layout>
    );
  }
}

export default ErrandScreen;
