import firebase from 'firebase';
import 'firebase/firestore';
import config from './firebaseConfig';

import store from '../store';

class ChatConfig {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => firebase.initializeApp(config);

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // this may need to change as users should always be signed in at this point anyways
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  getChatMessages = async () => {
    let docID = null;
    await firebase
      .firestore()
      .collection('chats')
      .where('group', '==', store.getState().auth.group)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          docID = doc.id;
        });
      });

    let chatMessages = firebase
      .firestore()
      .collection('chats')
      .doc(docID)
      .collection('messages');
    return chatMessages;
  };

  // We parse the message into the shape that GiftedChat needs
  parse = snapshot => {
    const { timestamp, text, user } = snapshot.data();
    const { id: _id } = snapshot;
    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  /* 'document.type == "added"' makes sure that we parse
  and render only the latest message added. Otherwise we end up in the situation
  where GiftedChat renders the same messages multiple times */
  on = callback => {
    unsubscribe = this.getChatMessages().then(promise => {
      promise.onSnapshot(snapshots => {
        snapshots.docChanges().forEach(document => {
          if (document.type == 'added') {
            callback(this.parse(document.doc));
          }
        });
      });
    });
  };

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };

  append = message =>
    this.getChatMessages().then(promise => {
      promise.add(message);
    });

  // close the connection to the Backend
  off() {
    unsubscribe();
  }
}

ChatConfig.shared = new ChatConfig();

export default ChatConfig;
