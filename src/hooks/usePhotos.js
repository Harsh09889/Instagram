import { useState, useEffect, useContext } from 'react';
import userContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
	const [photos, setPhotos] = useState(null);
	const {
		user: { uid: userId },
	} = useContext(userContext);

	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(userId);

			let photosOfUsersFollowed = [];

			if (following.length > 0) {
				photosOfUsersFollowed = await getPhotos(userId, following);
			}
			photosOfUsersFollowed.sort((a, b) => b.dateCreated - a.dateCreated);

			setPhotos(photosOfUsersFollowed);
		}

		getTimelinePhotos();
	}, [userId]);

	return { photos };
}
