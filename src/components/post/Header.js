import PropTypes from 'prop-types';

function Header({ username }) {
	return (
		<div className='flex border-b border-gray-primary h-4 p-4 py-8'>
			<div className='flex items-center'>
				<a
					href={`/p/${username}`}
					className='flex items-center'>
					<img
						src={`/images/avatars/${username}.jpg`}
						alt={`${username} profile`}
						className='rounded-full h-8 w-8 flex mr-3'
						onError={(e) => {
							e.target.onError = null;
							e.target.src = '/images/avatars/default.png';
						}}
					/>
					<p className='font-bold'>{username}</p>
				</a>
			</div>
		</div>
	);
}

export default Header;

Header.propTypes = {
	username: PropTypes.string.isRequired,
};
