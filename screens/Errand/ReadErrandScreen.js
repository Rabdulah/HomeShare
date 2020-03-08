import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import { DARK_BLUE } from '../../styles/colours';

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 16,
    color: DARK_BLUE
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
              justifyContent: 'center'
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color={DARK_BLUE}
              style={{ paddingRight: 6 }}
            />
            <Text style={{ color: DARK_BLUE }}>{date}</Text>
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
              navigation.navigate('createErrand');
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

  render() {
    return (
      <Layout>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>ReadErrandScreen</Text>
        <Text>{this.props.currentErrand.name}</Text>
      </Layout>
    );
  }
}

const mapStateToProps = ({ errand }) => {
  const { currentErrand } = errand;

  return { currentErrand };
};
export default connect(mapStateToProps, null)(ReadErrandScreen);
