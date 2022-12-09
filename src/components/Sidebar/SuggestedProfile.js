import React from "react";
import { useState } from "react";
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
} from "../../services/firebase";
import { useNavigate } from "react-router-dom";
// import * as ROUTES from "../../constants/routes";

function SuggestedProfile({
	loggedInUserDocId,
	userDocId,
	username,
	profileId,
	userId,
}) {
	const [followed, setFollowed] = useState(false);
	const navigate = useNavigate();

	async function handleFollowUser() {
		setFollowed(true);
		updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
		updateFollowedUserFollowers(userDocId, userId, false);
	}

	return !followed ? (
		<div className='flex justify-between items-center'>
			<div
				className='flex gap-2 items-center cursor-pointer'
				onClick={(e) => {
					navigate(`/p/${username}`);
				}}>
				<img
					className='w-8 rounded-full '
					src={`/images/avatars/${username}.jpg`}
					alt=''
					onError={(e) => {
						e.target.onError = null;
						e.target.src = "/images/avatars/default.png";
					}}
				/>
				<p className='text-xs font-bold'>{username}</p>
			</div>
			<button
				className='text-blue-medium text-sm font-bold'
				onClick={handleFollowUser}>
				Follow
			</button>
		</div>
	) : null;
}

export default SuggestedProfile;
