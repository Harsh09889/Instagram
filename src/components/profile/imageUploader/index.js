import React, { useContext } from "react";
import { useState } from "react";
import "./styles.css";
import { uploadPostImage } from "../../../services/firebase";
import useUser from "../../../hooks/useUser";

function UploadImage({ profile: { username: profileUsername } }) {
	const [file, setFile] = useState(null);
	const [caption, setCaption] = useState("");

	const { user } = useUser();

	const activeImageUploader =
		user.username && user.username === profileUsername;

	const captionChangeHandler = (e) => {
		setCaption(e.target.value);
	};

	const onInputChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		if (!file || !caption) return 1;
		await uploadPostImage(user.userId, user.username, file, caption);
		setFile("");
		setCaption(null);
	};

	return activeImageUploader ? (
		<div className='border-b border-gray-primary mt-12  py-4'>
			<div className='file-upload'>
				<button
					className='file-upload-btn'
					onClick={handleSubmit}
					type='submit'>
					Add Image
				</button>

				<input
					type='text'
					className='w-full my-4 p-2 border'
					placeholder='Add Caption...'
					value={caption}
					onChange={captionChangeHandler}
				/>

				<div className='image-upload-wrap flex items-center justify-center h-16'>
					<input
						type='file'
						onChange={onInputChange}
						accept='image/*'
						id='inputImage'
					/>
				</div>
			</div>
		</div>
	) : null;
}

export default UploadImage;
