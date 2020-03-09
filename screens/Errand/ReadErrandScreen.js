import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import { DARK_BLUE } from '../../styles/colours';

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 16,
    color: DARK_BLUE
  },
  text: {
    fontSize: 16
  },
  rowItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 10
  },
  rowItemRight: {
    color: '#7a92a5'
  }
});
class ReadErrandScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const currentErrand = params ? params.currentErrand : null;

    const date = currentErrand ? moment.unix(currentErrand.date).format('MMM D') : '';

    return {
      headerStyle: {
        backgroundColor: 'white'
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              paddingHorizontal: 16,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color={DARK_BLUE}
              style={{ paddingRight: 6 }}
            />
            <Text style={{ color: DARK_BLUE, height: '100%' }}>{date}</Text>
          </TouchableOpacity>
        );
      },
      headerTitle: () => (
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Errand Details</Text>
      ),
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('updateErrand');
            }}
          >
            <Text style={styles.headerText}>Edit</Text>
          </TouchableOpacity>
        );
      }
    };
  };

  componentDidMount() {
    const { currentErrand, navigation } = this.props;
    navigation.setParams({
      currentErrand
    });
  }

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

  renderAttendeeNames = () => {
    const { attendants } = this.props.currentErrand;

    // get human readable list of ppl attending
    const attendantNames = attendants.map(attendant => {
      return attendant.name.firstName;
    });

    return this.attendantNameArrayToString(attendantNames);
  };

  render() {
    const { name, date, owner, description } = this.props.currentErrand;
    return (
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 25, lineHeight: 25, fontWeight: '700' }}>{name}</Text>
        <Layout style={{ marginVertical: 20 }}>
          <Text>{moment.unix(date).format('dddd, MMM d, YYYY')}</Text>
          <Text>{moment.unix(date).format('h:mm A')}</Text>
        </Layout>
        <Layout>
          <Layout
            style={[
              {
                borderTopWidth: 1,
                borderTopColor: '#dbdbdb'
              },
              styles.rowItem
            ]}
          >
            <Text style={styles.text}>Errand event owner:</Text>
            <Text style={styles.rowItemRight}>
              {owner.name.firstName} {owner.name.lastName}
            </Text>
          </Layout>
          <Layout style={styles.rowItem}>
            <Text style={styles.text}>Roommates attending:</Text>
            <Text style={styles.rowItemRight}>{this.renderAttendeeNames()}</Text>
          </Layout>
          <Layout
            style={{
              paddingVertical: 10
            }}
          >
            <Text style={styles.text}>Roommates attending:</Text>
            <Text style={styles.rowItemRight}>{description}</Text>
          </Layout>
        </Layout>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ errand }) => {
  const { currentErrand } = errand;

  return { currentErrand };
};
export default connect(mapStateToProps, null)(ReadErrandScreen);
