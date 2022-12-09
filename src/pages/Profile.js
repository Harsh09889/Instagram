import { useState } from "react";
import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/Header";
import UserProfile from "../components/profile";
import * as ROUTES from "../constants/routes";

function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkIfUserExist = async () => {
			const user = await getUserByUsername(username);

			if (user.length > 0) {
				setUser(user[0]);
			} else {
				setUser(<Navigate to={ROUTES.NOT_FOUND} />);
			}
		};
		checkIfUserExist();
	}, [username]);

	return user?.username ? (
		<div className='bg-gray-background'>
			<Header />
			<div className='mx-auto max-w-screen-lg'>
				<UserProfile user={user} />
			</div>
		</div>
	) : (
		user
	);
}

export default Profile;
