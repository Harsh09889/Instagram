import React from "react";

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
