import React from "react";

function ChatMessage({ text, senderId, receiverId, isSender }) {
	let leftOrRight = isSender ? "justify-end" : "";
	return (
		<div className={`flex ${leftOrRight}`}>
			{/* <img src={`/images/avatars/${}`} alt="" /> */}
			<p className='p-2 border border-gray-primary flex rounded-3xl w-fit m-2'>
				{`${text}`}{" "}
			</p>
		</div>
	);
}

export default ChatMessage;
