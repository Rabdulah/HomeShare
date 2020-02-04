import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Button } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { emailChanged, clearErrors, resetPassword } from '../actions';

import Input from '../components/Input';
import Spinner from '../components/Spinner';
import { DARK_BLUE } from '../styles/colours';

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 18,
    textAlign: 'left',
    marginVertical: 14
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 25
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left'
  }
});

class ForgotPasswordScreen extends Component {
  /*
    componentDidMount => Lifecycle hook for whenever the user navigates to this screen.
    We are making sure to clear the global error states whenever they get to this screen,
    so no previous errors are shown.
  */
  componentDidMount() {
    this.props.clearErrors();
  }

  /*
    case where user successfully logs in.
  */
  componentDidUpdate(prevProps) {
    //this.onAuthComplete(this.props);
  }

  onAuthComplete = props => {
    // if (props.user) {
    //   // Set user's group if available
    //   this.props.getUserGroup(this.props.user);
    //   // programmatically navigate user
    //   this.props.navigation.navigate('home');
    // }
  };

  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onButtonPress = () => {
    const { email } = this.props;
    this.props.clearErrors();
    this.props.resetPassword({ email });
  };

  renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white', marginBottom: 30 }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  };

  renderSuccess = () => {
    if (this.props.success) {
      return (
        <View
          style={{
            marginBottom: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 16 }}>Password reset sent. </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('login')}
          >
            <Text
              style={{ color: DARK_BLUE, fontWeight: 'bold', fontSize: 16 }}
            >
              Return to login.
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" colour={DARK_BLUE} />;
    }

    return (
      <Button
        title="Send Password Reset"
        buttonStyle={{
          borderRadius: 5,
          padding: 10,
          backgroundColor: DARK_BLUE
        }}
        titleStyle={{
          width: '90%',
          fontSize: 20
        }}
        onPress={this.onButtonPress}
      />
    );
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Layout
          style={{
            flex: 2,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 30,
              lineHeight: 32,
              fontWeight: 'bold',
              marginVertical: 5
            }}
          >
            What's My Password?
          </Text>
          <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)' }}>
            If you have forgotten your password you can reset it here.
          </Text>
        </Layout>
        <Layout style={{ flex: 3 }}>
          <Input
            placeholder="Email"
            onChangeText={this.onEmailChange}
            secure={false}
            value={this.props.email}
            containerStyle={{ marginVertical: 0 }}
          />
          {this.renderError()}
          {this.renderSuccess()}
          <View
            style={[
              this.props.loading ? { marginVertical: 15 } : { marginTop: 0 }
            ]}
          >
            {this.renderButton()}
          </View>
        </Layout>
      </Layout>
    );
  }
}

/*
  first argument: our mapStateToProps function
  second argument: the action creator we want to "connect" to
  this function, which is imported at the top.

  now "emailChanged" is accessible via: this.props.emailChanged
*/
const mapStateToProps = state => {
  // state arg = our global app state
  /*
    return the property on the state obj we care about
    it is specifically state.AUTH b/c that is the value we assigned
    our reducer to in our combineReducers() call.

    our reducer produces the "email" property.
  */

  return {
    email: state.auth.email,
    error: state.auth.errorReset,
    success: state.auth.resetSuccess,
    loading: state.auth.loading,
    user: state.auth.user
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  clearErrors,
  resetPassword
})(ForgotPasswordScreen);
