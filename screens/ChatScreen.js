import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, YellowBox, View, Platform } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ChatFunctions from '../server/chat/ChatFunctions';
import _ from 'lodash';

/*------------------------------------------------------------*/
/* This is a fix for a timer warning bug on android. It's a problem
on firebase's end. If this problem persists in other component screens 
we should consider this plugin which supposedly fixes the problem 
https://github.com/invertase/react-native-firebase */

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
/*------------------------------------------------------------*/
class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat'
  });

  state = {
    messages: []
  };

  get user() {
    return {
      name: 'ramzi',
      _id: ChatFunctions.shared.uid
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={ChatFunctions.shared.send}
          user={this.user}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    );
  }

  componentDidMount() {
    ChatFunctions.shared.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
  }
  componentWillUnmount() {
    ChatFunctions.shared.off();
  }
}

const styles = StyleSheet.create({});

export default ChatScreen;