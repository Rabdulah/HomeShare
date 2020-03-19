import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { retrieveChores } from '../../actions';
import CustomBarChart from '../../components/CustomBarChart';
import { DARK_BLUE } from '../../styles/colours';

class ReadChoreScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const currentChoreName = params ? params.currentChoreName : null;
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
      headerTitle: () => <Text style={{ fontWeight: 'bold' }}>{currentChoreName}</Text>,
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('updateChore');
            }}
          >
            <Ionicons
              name="md-create"
              size={30}
              color={DARK_BLUE}
              style={{ paddingHorizontal: 16 }}
            />
          </TouchableOpacity>
        );
      }
    };
  };

  componentDidMount() {
    const { navigation, currentChore } = this.props;
    navigation.setParams({
      currentChoreName: currentChore.name
    });
  }

  getData = () => {
    const { responsibility } = this.props.currentChore;
    const data = responsibility.map(user => {
      return user.count;
    });

    return data;
  };

  render() {
    const { currentChore } = this.props;
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CustomBarChart data={currentChore.responsibility} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ chore }) => {
  const { currentChore } = chore;

  return { currentChore };
};
export default connect(mapStateToProps, { retrieveChores })(ReadChoreScreen);
