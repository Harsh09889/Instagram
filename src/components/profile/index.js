import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import { getUserPhotosByUsername } from "../../services/firebase";

function UserProfile({ user }) {
	const reducer = (state, newState) => ({ ...state, ...newState });

	const initialState = {
		profile: {},
		photosCollection: [],
		followerCount: 0,
	};

	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username);
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers ? user.followers.length : 0,
			});
		}
		getProfileInfoAndPhotos();
	}, [user.username]);

	return (
		<div>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>
			<Photos photos={photosCollection} />
		</div>
	);
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number,
		emailAddress: PropTypes.string,
		followers: PropTypes.array,
		following: PropTypes.array,
		fullName: PropTypes.string,
		userId: PropTypes.string,
		username: PropTypes.string,
	}).isRequired,
};

export default UserProfile;
