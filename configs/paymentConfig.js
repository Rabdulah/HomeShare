import firebase from 'firebase';
import 'firebase/firestore';
import config from './firebaseConfig';

class PaymentConfig {
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

  createPayment = () => {
    firebase
      .firestore()
      .collection(payments)
      .add({
          cost
      });
  };
}
