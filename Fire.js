import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuHuqq_MG0NopjndefOSfjC3z531OOo58",
    authDomain: "mylist01407.firebaseapp.com",
    databaseURL: "https://mylist01407.firebaseio.com",
    projectId: "mylist01407",
    storageBucket: "mylist01407.appspot.com",
    messagingSenderId: "379872023730",
    appId: "1:379872023730:web:aa090cd01fee3541cea5ab"
};

class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null, user)
            } else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");

            this.unsubscribe = ref.onSnapshot(snapshot => {
                lists = [];

                snapshot.forEach(doc => {
                    lists.push({id: doc.id, ...doc.data()})
                });

                callback(lists);
            });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;