import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);

	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				// if there is an authUser then we can store it in the local storage...
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				// we dont have a user that is why we are clearing the auth user
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});

		return () => listener();
	}, [firebase]);

	return { user };
}
