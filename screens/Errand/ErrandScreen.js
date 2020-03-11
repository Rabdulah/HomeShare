import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import { viewErrand } from '../../actions';
import { DARK_BLUE } from '../../styles/colours';
import Avatar from '../../components/Avatar';

const FORMAT = 'YYYY-MM-DD';
const TODAY = moment().format(FORMAT);
const INITITAL_STATE = {
  errandsForSelectedDay: {},
  currentMonth: null,
  errands: {},
  monthsLoaded: new Array(13),
  markedDates: {}
};

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
            navigation.navigate('createErrand');
          }}
        >
          <Ionicons name="md-add" size={30} color={DARK_BLUE} style={{ paddingHorizontal: 16 }} />
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);

    this.state = INITITAL_STATE;
  }

  componentDidMount = async () => {
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

  getErrandsForCurrentMonth = async (startDate, endDate) => {
    const { group } = this.props;

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

            // return to original call
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

        // dispatch an action or smt at some point
        // for now, just setup errands data for format required.
        this.setupErrandsData(errands);
      });
  };

  setupErrandsData = errands => {
    // the items / errands in the Agenda require a certain format.
    const { currentMonth } = this.state;
    const currErrandsInState = this.state.errands;
    let startDate = moment([currentMonth.year, currentMonth.month - 1]);
    let endDate = moment(startDate).endOf('month');
    startDate = parseInt(startDate.format('D'));
    endDate = parseInt(endDate.format('D'));

    // setup buckets for errand items
    const items = { ...currErrandsInState };
    const markedDates = { ...this.state.markedDates };
    for (; startDate <= endDate; startDate += 1) {
      // format / get double digit day, month cuz the Agenda lib needs this
      const doubleDigitDay = `0${startDate}`.slice(-2);
      const doubleDigitMonth = `0${currentMonth.month}`.slice(-2);
      const dateFormatted = `${currentMonth.year}-${doubleDigitMonth}-${doubleDigitDay}`;
      items[dateFormatted] = [];
    }
    // loop through all items for this month, add to bucket, add to markedDates
    errands.forEach(errand => {
      // format date properly
      const errandDateFormatted = moment.unix(errand.date).format('YYYY-MM-DD');

      // add errand to appropriate key in items {}
      items[errandDateFormatted].push(errand);

      // make sure to mark the errand
      markedDates[errandDateFormatted] = { marked: true };
    });

    this.setState({ errands: items, markedDates }, () => {
      this.onUpdateSelectedDate(moment().add(1, 'months'));
    });
  };

  // helper function to convert an arr of names to a sentence
  attendantNameArrayToString = arr => {
    if (arr.length === 0) {
      return 'No one';
    }

    if (arr.length === 1) {
      return arr[0];
    }

    if (arr.length === 2) {
      return `${arr[0]} and ${arr[1]}`;
    }

    let str = '';
    arr.forEach((el, index) => {
      if (index === arr.length - 1) {
        str += `and ${el}`;
      } else {
        str += `${el}, `;
      }
    });

    return str;
  };

  nameToInitials = name => {
    const initials = name.firstName.charAt(0) + name.lastName.charAt(0);
    return initials.toUpperCase();
  };

  /*
    handler when user clicks on an errand to view it
  */
  onErrandPress = errand => {
    console.log('errand', errand);
    const { viewErrand, navigation } = this.props;
    viewErrand(errand);
    navigation.navigate('readErrand');
  };

  /* 
    this function determines what will be rendered in the agenda
    for a specific day.
  */
  renderItem = (item, firstItemInDay) => {
    // get time of day
    const timeOfDay = moment.unix(item.date);

    // get human readable list of ppl attending
    const attendantNames = item.attendants.map(attendant => {
      return attendant.name.firstName;
    });

    const verb = attendantNames.length > 1 ? 'are' : 'is';
    const ownerInitials = this.nameToInitials(item.owner.name);
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }, { flexDirection: 'row' }]}
        onPress={() => {
          this.onErrandPress(item);
        }}
      >
        <Layout style={{ flex: 1 }}>
          <Text>{timeOfDay.format('h:mm A')}</Text>
          <Text style={{ marginVertical: 10 }}>{item.name}</Text>
          <Text style={{ color: '#7a92a5' }}>{item.description}</Text>
          <Text style={{ color: '#7a92a5' }}>{`${this.attendantNameArrayToString(
            attendantNames
          )} ${verb} attending.`}</Text>
        </Layout>
        <Layout
          style={{
            flex: 0.25
          }}
        >
          <Avatar initials={ownerInitials} />
        </Layout>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <Layout style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </Layout>
    );
  };

  /*
    this function runs when u select a diff date.
    this may need some extra luv. 

    need to implement the part where u select smt
    from a diff month.
   */
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

  loadItemsForMonth = month => {
    this.setState({ currentMonth: month });
    const monthNumber = month.month;

    /* 
      only fetch errands for months that have not been loaded.
      
      this is kept track in the monthsLoaded[]. if, say,
      monthsLoaded[1] = true, then it means that all errands
      for January have been loaded.
    */
    if (!this.state.monthsLoaded[monthNumber]) {
      /*
     get start and end date of the month
     b/c we will limit how much data we get from
     firebase to the current month being viewed.
   */
      const endDate = moment(month.dateString)
        .add(1, 'months')
        .date(0)
        .endOf('day')
        .toDate();

      const { year } = month;
      const startDate = moment([parseInt(year), parseInt(monthNumber) - 1]).toDate();

      // 1.) make a shallow copy of months loaded
      const monthsLoaded = [...this.state.monthsLoaded];

      // 2.) update part in arr we want to update
      monthsLoaded[monthNumber] = true;

      this.setState({ monthsLoaded }, () => {
        this.getErrandsForCurrentMonth(startDate, endDate);
      });
    }
  };

  getErrandsForCurrentMonthHelper = () => {
    const { current } = this.state;
    console.log('month in helper', this.state);
  };

  render() {
    const { errandsForSelectedDay, markedDates } = this.state;

    return (
      <>
        <NavigationEvents onDidFocus={this.getErrandsForCurrentMonthHelper} />
        <Layout style={{ flex: 1 }}>
          <Agenda
            items={errandsForSelectedDay}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={this.loadItemsForMonth}
            onDayPress={this.onUpdateSelectedDate}
            // Callback that fires when the calendar is opened or closed
            onCalendarToggled={calendarOpened => { }}
            // Initially selected day
            selected={TODAY}
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
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={markedDates}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault
            // Agenda container style
            style={{}}
          />
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5
  }
});

const mapStateToProps = ({ auth }) => {
  const { group } = auth;

  return { group };
};
export default connect(mapStateToProps, { viewErrand })(ErrandScreen);
