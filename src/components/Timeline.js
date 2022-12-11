import React from "react";
import usePhotos from "../hooks/usePhotos";
import Skeleton from "react-loading-skeleton";
import Post from "./post";

function Timeline() {
	const { photos } = usePhotos();
	return (
		<div className='container col-span-2'>
			{!photos ? (
				<>
					<Skeleton
						count={4}
						height={500}
						width={540}
						className='mb-5'
					/>
					;
				</>
			) : photos?.length > 0 ? (
				photos.map((content) => {
					return (
						<Post
							key={content.docId}
							content={content}
						/>
					);
				})
			) : (
				<>
					<p className='text-center text-2xl'>Follow People to see Photos</p>
				</>
			)}
		</div>
	);
}

export default Timeline;
