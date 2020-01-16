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
    return '1/16/2020';
  }

  get usersGroup() {
    return store.getState().auth.group;
  }

  get paymentRefs() {
    return firebase.firestore().collection('payments');
  }

  createPayment = () => {
    console.log('creating payment');
    this.paymentRefs
      .add({
        cost: 12,
        date: this.timestamp,
        group: this.usersGroup,
        name: 'food',
        owner: 'new boi',
        payees: [{ amount: 4, isPaid: false, user: 'matt' }]
      })
      .then(() => {
        console.log('Document successfully added!');
      })
      .catch(err => {
        console.log('Error adding document: ', err);
      });
  };

  /* 
  We pass in a callabck function for two reasons:
  1. JavaScript forEach() does not return anything
  2. Well couldn't we push each result from the forEach() into an array then return the array? 
    For that to work you'd have to await the function until it's done, then return that array 
    (or else the array will be empty). The issue with that approach is that you can't 
    async/await a function that utilizes the onSnapshot() method. This makes sense
    as onSnapshot() is a listener for new updates. You can't have a function wait on it forever.
    Thus, the best way to get information out of here is to pass in a callback function. 
    A trivial one to make sure data is being received: getPayments(message => console.log(message));
    But it's more likely you'd want to pass in a React setState() function from the component.
  */
  getPayments = callback => {
    console.log('reading payments');
    unsubscribe = this.paymentRefs
      .where('group', '==', this.usersGroup)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            callback(this.parse(change.doc));
          }
        });
      });
  };

  // updatedFields is object shaped like this: { field: 'updatedValue', cost: 4, name: 'updatedfood' }
  updatePayment = (docID, updatedFields) => {
    this.paymentRefs
      .doc(docID)
      .update(updatedFields)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(err => {
        console.log('Error updating document: ', err);
      });
  };

  deletePayment = docID => {
    this.paymentRefs
      .doc(docID)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(err => {
        console.log('Error removing document: ', err);
      });
  };

  // We parse the payment snapshot for the information we're interested
  parse = doc => {
    const { cost, date, name, owner, payees } = doc.data();
    const { id: _id } = doc;
    const payment = {
      _id,
      cost,
      date,
      name,
      owner,
      payees
    };
    return payment;
  };

  // close the connection to the Backend
  off() {
    unsubscribe();
  }
}

PaymentConfig.shared = new PaymentConfig();

export default PaymentConfig;
