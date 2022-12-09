import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import userContext from '../../context/user';

function AddComment({ docId, comments, setComments, commentInput }) {
	const [comment, setComment] = useState('');
	const { firebase, FieldValue } = useContext(FirebaseContext);
	const {
		user: { displayName },
	} = useContext(userContext);

	const handleSubmitComment = (e) => {
		e.preventDefault();

		setComments([{ displayName, comment }, ...comments]);

		return firebase
			.firestore()
			.collection('photos')
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({ displayName, comment }),
			});
	};

	return (
		<div className='border-t border-gray-primary'>
			<form
				action=''
				method='POST'
				onSubmit={(e) =>
					comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
				}
				className='flex justify-between pl-0 pr-5'>
				<input
					type='text'
					aria-label='Add a comment'
					placeholder='Add a comment'
					autoComplete='off'
					className='text-sm text-gray-base w-full mr-3 py-5 px-4'
					name='add-comment'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					ref={commentInput}
				/>
				<button
					className={`text-sm font-bold text-blue-medium ${
						!comment && 'opacity-25'
					}`}
					type='button'
					disabled={comment.length < 1}
					onClick={handleSubmitComment}>
					POST
				</button>
			</form>
		</div>
	);
}

export default AddComment;

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object,
};
