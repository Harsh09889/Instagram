import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebasConfig = {
	apiKey: 'AIzaSyBGzN9puD_2Yawwx2ZtcaXh4Pcrb9bwyXM',
	authDomain: 'project-insta-3694a.firebaseapp.com',
	projectId: 'project-insta-3694a',
	storageBucket: 'project-insta-3694a.appspot.com',
	messagingSenderId: '969012768703',
	appId: '1:969012768703:web:e4c147207d6f09838bbb0a',
};

const firebase = Firebase.initializeApp(firebasConfig);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
