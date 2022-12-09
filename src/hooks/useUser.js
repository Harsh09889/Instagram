import { useState, useEffect, useContext } from 'react';
import userContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
	const [activeUser, setActiveUser] = useState({});
	const { user } = useContext(userContext);

	useEffect(() => {
		async function getUserObjByUserId() {
			// here we need a function that gets the user by user Id...

			const [response] = await getUserByUserId(user.uid);

			setActiveUser(response);
		}
		if (user?.uid) {
			getUserObjByUserId();
		}
	}, [user]);

	return { user: activeUser };
}
