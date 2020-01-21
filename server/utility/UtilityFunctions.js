import firebase from 'firebase';
import 'firebase/firestore';

import store from '../../store';

class UtilityFunctions {
    constructor() {
        this.observeAuth();
    }

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
        return new Date();
    }

    get usersGroup() {
        return store.getState().auth.group;
    }

    get utilityRefs() {
        return firebase.firestore().collection('utilities');
    }

    getUtilities = async callback => {
        console.log("reading utilities");
        unsubscribe = this.utilityRefs
            .where('group', '==', this.usersGroup)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added' || change.type === 'modified') {
                        callback(this.parse(change.doc));
                    }
                });
            });
    }

    // We parse the utility snapshot for the information we're interested
    parse = doc => {
        const { active, cost, date, interval, name, recurring } = doc.data();
        const { id: _id } = doc;
        // interval: ENUM {WEEKLY, BI_WEEKLY, MONTHLY}
        const utility = {
            _id,
            cost,
            date,
            interval,
            name,
            recurring
        };
        return utility;
    };

    // close the connection to the Backend
    off() {
        unsubscribe();
    }
}

UtilityFunctions.shared = new UtilityFunctions();

export default UtilityFunctions;