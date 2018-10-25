import firebase from 'firebase';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () =>
    firebase.initializeApp({
        apiKey: "AIzaSyAeGaTaMbHfXQ3nUiXiIGtUJAH4OYeHExk",
        authDomain: "vastgoedbs-663cd.firebaseapp.com",
        databaseURL: "https://vastgoedbs-663cd.firebaseio.com",
        projectId: "vastgoedbs-663cd",
        storageBucket: "vastgoedbs-663cd.appspot.com",
        messagingSenderId: "786621546607"
    });

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

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
    
      get ref() {
        return firebase.database().ref('messages');
      }
    
      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
          _id,
          timestamp,
          text,
          user,
        };
        return message;
      };

    on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;