import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((user) => user.data.length > 0);
}

export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((user) => ({
		...user.data(),
		docId: user.id,
	}));
}

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase.firestore().collection("users").limit(10).get();

	const user = result.docs
		.map((item) => ({
			...item.data(),
			docId: item.id,
		}))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		);

	return user;
}

export async function updateLoggedInUserFollowing(
	loggedInUserDocId,
	profileId,
	isFollowingProfile
) {
	firebase
		.firestore()
		.collection("users")
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});
}

export async function updateFollowedUserFollowers(
	userDocId,
	loggedInUserId,
	isFollowingProfile
) {
	firebase
		.firestore()
		.collection("users")
		.doc(userDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(loggedInUserId)
				: FieldValue.arrayUnion(loggedInUserId),
		});
}

export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "in", following)
		.get();

	const photosOfUserFollowed = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		photosOfUserFollowed.map(async (photo) => {
			let userLikedPhotos = false;
			if (photo.likes.includes(userId)) {
				userLikedPhotos = true;
			}
			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];

			return { username, ...photo, userLikedPhotos };
		})
	);

	return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
	const [user] = await getUserByUsername(username);
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "==", user.userId)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
}

export async function isUserFollowingProfile(
	loggedInUserUsername,
	profileUserId
) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", loggedInUserUsername)
		.where("following", "array-contains", profileUserId)
		.get();

	const [response = {}] = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return response.userId;
}

export async function toggleFollow(
	isFollowingProfile,
	activeUserDocId,
	profileDocId,
	profileUserId,
	followingUserId
) {
	await updateLoggedInUserFollowing(
		activeUserDocId,
		profileUserId,
		isFollowingProfile
	);

	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}
