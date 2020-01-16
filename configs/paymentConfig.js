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

  get usersGroup() {
    return store.getState().auth.group;
  }

  createPayment = () => {
    console.log('creating payment');
    let docID = null;
    // await firebase
    //   .firestore()
    //   .collection('payments')
    //   .where('group', '==', this.usersGroup)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       docID = doc.id;
    //     });
    //   });
    firebase
      .firestore()
      .collection('payments')
      .add({
        cost: 10,
        date: this.timestamp,
        group: this.usersGroup,
        name: 'food',
        owner: 'new boi',
        payees: [{ amount: 4, isPaid: false, user: 'matt' }]
      });
  };

  getPayments = () => {
    console.log('reading payments');
    var payments = firebase
      .firestore()
      .collection('payments')
      .where('group', '==', this.usersGroup)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          console.log(this.parse(change.doc));
        });
      });
  };

  // We parse the payment snapshot for the information we're interested
  parse = doc => {
    console.log('parse');
    const { cost, date, name, owner, payees } = doc.data();
    const payment = {
      cost,
      date,
      name,
      owner,
      payees
    };
    return payment;
  };
}

PaymentConfig.shared = new PaymentConfig();

export default PaymentConfig;
