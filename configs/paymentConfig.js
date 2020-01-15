import firebase from 'firebase';
import 'firebase/firestore';
import config from './firebaseConfig';

import store from '../store';

class PaymentConfig {
  constructor() {
    //this.init();
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
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  createPayment = () => {
    console.log('yay')
    firebase
      .firestore()
      .collection('payments')
      .add({
        cost: 10,
        date: this.timestamp,
        group: store.getState().auth.group,
        name: 'food',
        owner: 'ramzi',
        payees: [
          { amount: 4, isPaid: false, user: 'matt' }
        ]
      });
  };
}

PaymentConfig.shared = new PaymentConfig();

export default PaymentConfig;
