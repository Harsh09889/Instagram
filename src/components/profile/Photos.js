import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

function Photos({ photos }) {
	return (
		<div className='h-16 border-t border-gray-primary mt-12  pt-4'>
			<div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
				{!photos ? (
					<Skeleton
						count={12}
						width={320}
						height={400}
					/>
				) : photos.length > 0 ? (
					photos.map((photo) => (
						<div
							key={photo.docId}
							className='relative group'>
							<img
								src={photo.imageSrc}
								alt={photo.caption}
							/>
							<div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'>
								<p className='flex items-center text-white font-bold'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										class='w-6 h-6'>
										<path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
									</svg>

									{photo.likes.length}
								</p>
								<p className='flex items-center text-white font-bold'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										class='w-6 h-6'>
										<path
											fill-rule='evenodd'
											d='M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
											clip-rule='evenodd'
										/>
									</svg>

									{photo.comments.length}
								</p>
							</div>
						</div>
					))
				) : null}
			</div>

			{!photos ||
				(photos.length === 0 && (
					<p className='text-center text-2xl'>No Posts Yet</p>
				))}
		</div>
	);
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired,
};

export default Photos;
