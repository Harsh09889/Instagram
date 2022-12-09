import { useState } from 'react';
import PropTypes from 'prop-types';

function Footer({ caption, username }) {
	return (
		<div className='p-4 pt-2 pb-0'>
			<span className='mr-1 font-bold'>{username}</span>
			<span>{caption}</span>
		</div>
	);
}

export default Footer;