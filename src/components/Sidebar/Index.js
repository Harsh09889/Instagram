import React from 'react';
import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';

function Sidebar() {
	const {
		user: { docId, username, fullName, userId, following },
	} = useUser();

	return (
		<div>
			<User
				username={username}
				fullName={fullName}
			/>
			<Suggestions
				userId={userId}
				following={following}
				docId={docId}
			/>
		</div>
	);
}

export default Sidebar;
