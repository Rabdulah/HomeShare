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

  constructor(props) {
    super(props);

    this.state = {
      errandsForSelectedDay: {},
      currentMonth: null,
      errands: null
    };
  }

  componentDidMount = async () => {
    const { group } = this.props;
    console.log(moment().month());
    const month = moment().month();
    const year = moment().year();

    const startDate = moment([year, month]).toDate();
    const endDate = moment()
      .add(1, 'months')
      .date(0)
      .toDate();

    console.log(startDate);
    // convoluted firebase fetch
    const response = await firebase
      .firestore()
      .collection('errands')
      .where('group', '==', group)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .get()
      .then(async snapshot => {
        const errands = await Promise.all(
          snapshot.docs.map(async doc => {
            const { name, description, date } = doc.data();
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
            return {
              id: doc.id,
              name,
              description,
              attendants,
              owner,
              date: date.seconds // timestamp in unix seconds
            };
          })
        );

        // dispatch an action or smt
        this.setupErrandsData(errands);
      });
    // firebase
    //   .firestore()
    //   .collection('errands')
    //   .add({
    //     group: '',
    //     name: 'Another errand',
    //     description: 'doing smt',
    //     owner: '',
    //     date: '',
    //     attendants: [
    //       { count: 3, userRef: '' },
    //       { count: 3, userRef: '' },
    //       { count: 3, userRef: '' }
    //     ]
    //   });
  };

  setupErrandsData = errands => {
    const { currentMonth } = this.state;
    let startDate = moment([currentMonth.year, currentMonth.month - 1]);
    let endDate = moment(startDate).endOf('month');
    startDate = parseInt(startDate.format('D'));
    endDate = parseInt(endDate.format('D'));

    // setup buckets for errand items
    const items = {};
    for (; startDate <= endDate; startDate += 1) {
      const doubleDigitDay = `0${startDate}`.slice(-2);
      const doubleDigitMonth = `0${currentMonth.month}`.slice(-2);
      const dateFormatted = `${currentMonth.year}-${doubleDigitMonth}-${doubleDigitDay}`;
      items[dateFormatted] = [];
    }

    // loop through all items for this month, add to bucket
    errands.forEach(errand => {
      const errandDateFormatted = moment.unix(errand.date).format('YYYY-MM-DD');
      items[errandDateFormatted].push(errand);
    });

    this.setState({ errands: items }, () => {
      this.onUpdateSelectedDate(moment().add(1, 'months'));
    });
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

  onUpdateSelectedDate = date => {
    const formattedDate = moment(date)
      .subtract(1, 'months')
      .format(FORMAT);
    const { errands } = this.state;
    const dates = errands[formattedDate];
    this.setState({
      errandsForSelectedDay: {
        [formattedDate]: dates
      }
    });
  };

  render() {
    const { errandsForSelectedDay } = this.state;
    return (
      <Layout style={{ flex: 1 }}>
        <Agenda
          items={errandsForSelectedDay}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => {
            console.log('trigger items loading');
            this.setState({ currentMonth: month });
          }}
          onDayPress={this.onUpdateSelectedDate}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => { }}
          // Initially selected day
          selected={TODAY}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={this.renderItem}
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
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5
  }
});

const mapStateToProps = ({ auth }) => {
  const { group } = auth;

  return { group };
};
export default connect(mapStateToProps, null)(ErrandScreen);
