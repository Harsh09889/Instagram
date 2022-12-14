import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

function Comments({ docId, comments: allComments, commentInput, posted }) {
	const [comments, setComments] = useState(allComments);

	return (
		<>
			<div className='p-4 pt-1 pb-4'>
				{comments.length >= 3 && (
					<p className='text-sm text-gray-base mb-1 cursor-pointer'>
						View all {comments.length} comments
					</p>
				)}
				{comments.slice(0, 3).map((item) => (
					<p
						key={` ${item.comment}- ${item.displayName}`}
						className='mb-1'>
						<Link to={`/p/${item.displayName}`}>
							<span className='mr-1 font-bold'>{item.displayName}</span>
						</Link>
						<span>{item.comment}</span>
					</p>
				))}

				<p className='text-gray-base uppercase text-xs '>
					{formatDistance(posted, new Date())} ago
				</p>
			</div>
			<AddComment
				docId={docId}
				comments={comments}
				commentInput={commentInput}
				setComments={setComments}
			/>
		</>
	);
}

export default Comments;

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
};
