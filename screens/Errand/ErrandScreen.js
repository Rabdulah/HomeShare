import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
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

  componentDidMount = async () => {
    const { group } = this.props;
    // convoluted firebase fetch
    const response = await firebase
      .firestore()
      .collection('errands')
      .where('group', '==', group)
      .get()
      .then(async snapshot => {
        const errands = await Promise.all(
          snapshot.docs.map(async doc => {
            const { name, description } = doc.data();
            let attendantsFromDb = doc.data().attendants;
            const attendants = [];

            // fetch owner from db
            const ownerSnapshot = await firebase
              .firestore()
              .collection('users')
              .doc(doc.data().owner.id)
              .get();

            const ownerData = ownerSnapshot.data();
            const owner = {
              address: ownerData.address,
              email: ownerData.email,
              name: ownerData.name,
              username: ownerData.username,
              id: ownerSnapshot.id
            };
            // get all attendants from db (fetch)
            attendantsFromDb = await Promise.all(
              attendantsFromDb.map(async attendant => {
                const a = await firebase
                  .firestore()
                  .collection('users')
                  .doc(attendant.userRef.id)
                  .get();

                // pull off data we want form user;
                const attendantData = a.data();
                attendants.push({
                  address: attendantData.address,
                  email: attendantData.email,
                  name: attendantData.name,
                  username: attendantData.username,
                  id: a.id
                });

                /*
              return attendantData to the mapping of the attendants arr
            */

                return {
                  address: attendantData.address,
                  email: attendantData.email,
                  name: attendantData.name,
                  username: attendantData.username,
                  id: a.id
                };
              })
            );
            console.log('name', name);
            return {
              id: doc.id,
              name,
              description,
              attendants,
              owner
            };
          })
        );

        // dispatch an action or smt
        console.log('errands', errands);
      });
    // firebase
    //   .firestore()
    //   .collection('errands')
    //   .add({
    //     group: '',
    //     name: 'car',
    //     description: 'going to the grocery store',
    //     owner: '',
    //     attendants: [
    //       { count: 3, userRef: '' },
    //       { count: 3, userRef: '' },
    //       { count: 3, userRef: '' }
    //     ]
    //   });
  };

  renderItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <Layout style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </Layout>
    );
  };

  render() {
    return (
      <Layout style={{ flex: 1 }}>
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            '2020-02-22': [{ name: 'item 1 - any js object' }],
            '2020-02-23': [{ name: 'item 2 - any js object', height: 80 }],
            '2020-02-24': [],
            '2020-02-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => {
            console.log('trigger items loading');
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={day => {
            console.log('day pressed');
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            console.log('day changed');
          }}
          // Initially selected day
          selected={TODAY}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={TODAY}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={this.renderItem}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {
            return <Layout />;
          }}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={this.renderEmptyDate}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            '2020-02-16': { marked: true },
            '2020-02-17': { marked: true },
            '2020-02-18': { disabled: true }
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // Agenda theme
          theme={{
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red'
          }}
          // Agenda container style
          style={{}}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = ({ auth }) => {
  const { group } = auth;

  return { group };
};
export default connect(mapStateToProps, null)(ErrandScreen);
