import React from 'react';
import PropTypes from 'prop-types';

function Image({ src, caption }) {
	return (
		<div>
			<img
				src={src}
				alt=''
				className='flex'
			/>
		</div>
	);
}

export default Image;
Image.propType = {};
