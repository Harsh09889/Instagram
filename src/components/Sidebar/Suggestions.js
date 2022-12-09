import { useState, useEffect } from 'react';
import { getSuggestedProfiles } from '../../services/firebase';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './SuggestedProfile';

function Suggestions({ docId, userId, following }) {
	const [profiles, setProfiles] = useState(null);

	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following);
			setProfiles(response);
		}

		if (userId) suggestedProfiles();
	}, [userId, following]);

	return !profiles ? (
		<>
			<Skeleton
				count={1}
				height={150}
				className='mt-5'
			/>
		</>
	) : profiles.length > 0 ? (
		<>
			{' '}
			<div className='flex rounded flex-col'>
				<div className='text-sm items-center align-middle justify-between mb-2'>
					<p className='font-bold text-gray-base'>Suggestions for you</p>
				</div>
			</div>
			<div className='mt-4 grid gap-5'>
				{profiles.map((profile) => {
					return (
						<SuggestedProfile
							key={profile.docId}
							userDocId={profile.docId}
							loggedInUserDocId={docId}
							username={profile.username}
							profileId={profile.userId}
							userId={userId}
						/>
					);
				})}
			</div>
		</>
	) : null;
}

export default Suggestions;

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
};
