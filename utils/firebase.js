import * as firebase from 'firebase';

const FOUR_MONTHS = 4 * 30 * 24 * 60 * 60 * 1000; // ms

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJTHqxiXmeZ8ere_TQH_-UgG8bsGWFy-4",
    authDomain: "censormap.firebaseapp.com",
    databaseURL: "https://censormap.firebaseio.com",
    projectId: "censormap",
    storageBucket: "censormap.appspot.com",
    messagingSenderId: "810696107628"
};

firebase.initializeApp(firebaseConfig);

/**
 * Set up a Firebase with deletion on pings older than expiryMilliseconds
 */
function initFirebase(onAdded, onRemoved) {

    // 1 week before current time.
    const startTime = new Date().getTime() - FOUR_MONTHS;

    // Reference to the pings in Firebase.
    const pings = firebase.database().ref('pings');

    console.log(startTime, onAdded);

    // Listener for when a ping is added.
    // TODO: get last n
    pings.limitToLast(20).on('value', onAdded);

    // Remove old data from the heatmap when a point is removed from firebase.
    pings.on('child_removed', onRemoved);
}

export {
    firebase,
    initFirebase,
};