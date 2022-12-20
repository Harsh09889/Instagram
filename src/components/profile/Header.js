import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

function Header({
	photosCount,
	followerCount,
	setFollowerCount,
	loggedInUsername,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		username: profileUsername,
		following = [],
		followers = [],
	},
}) {
	const { user } = useUser();
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);

	const activeBtnFollow = user.username && user.username !== profileUsername;

	const handleToggleFollow = async () => {
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
		});
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);

			setIsFollowingProfile(!!isFollowing);
		};

		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}

		// eslint-disable-next-line
	}, [user.username, profileUserId]);

	return (
		<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
			<div className='container flex justify-center'>
				{user.username ? (
					<img
						src={`/images/avatars/${profileUsername}.jpg`}
						className='rounded-full h-40 w-40 flex'
						alt={profileUsername}
						onError={(e) => {
							e.target.onError = null;
							e.target.src = "/images/avatars/default.png";
						}}
					/>
				) : (
					<Skeleton
						count={1}
						height={500}
						width={540}
						className='mb-5'
					/>
				)}
			</div>
			<div className='flex items-center justify-center flex-col col-span-2'>
				<div className='container flex items-center'>
					<p className='text-2xl mr-4'>{profileUsername} </p>
					{activeBtnFollow && (
						<button
							className='bg-blue-medium font-bold text-m rounded text-white w-20 h-8'
							type='button'
							onClick={handleToggleFollow}>
							{isFollowingProfile ? "Unfollow" : "Follow"}
						</button>
					)}
				</div>
				<div className='container mt-4 flex'>
					{followers === undefined && following === undefined ? (
						<Skeleton
							count={1}
							width={677}
							height={24}
						/>
					) : (
						<>
							<p className='mr-10'>
								<span className='font-bold'>{photosCount}</span>
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{followerCount}</span>
								{"  "} {followerCount === 1 ? "follower" : "followers"}
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{following.length}</span> following
							</p>
						</>
					)}
				</div>
				<div className='container mt-4'>
					<p className='font-medium'>
						{!fullName ? (
							<Skeleton
								count={1}
								height={24}
							/>
						) : (
							fullName
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
	}).isRequired,
};

export default Header;
