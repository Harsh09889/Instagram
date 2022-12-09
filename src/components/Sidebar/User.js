import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const User = ({ fullName, username }) =>
	!username || !fullName ? (
		<Skeleton
			count={1}
			height={61}
		/>
	) : (
		<a
			href={`/p/${username}`}
			className='flex justify-between mb-6 items-center'>
			<div className='flex items-center justify-start col-span-1'>
				<img
					className='rounded-full w-16 flex mr-3 shrink-1'
					src={`/images/avatars/${username}.jpg`}
					alt=''
					onError={(e) => {
						e.target.onError = null;
						e.target.src = '/images/avatars/default.png';
					}}
				/>
			</div>
			<div className='flex-1'>
				<p className='text-sm font-bold'>{username}</p>
				<p className='text-sm '>{fullName}</p>
			</div>
		</a>
	);

export default User;

User.propTypes = {
	fullName: PropTypes.string,
	username: PropTypes.string,
};
