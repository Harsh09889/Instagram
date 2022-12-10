import { useEffect } from "react";
import { firebase, FieldValue } from "../../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { useState } from "react";
import user from "../../hooks/useUser";
import { useRef } from "react";

function Inbox({ receiver }) {
	const messageRef = firebase.firestore().collection("messages");
	const query = messageRef.orderBy("createdAt").limit(25);
	const [msgInput, setMsgInput] = useState("");
	const sender = user();
	const dummy = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [receiver]);

	const sendMessage = async (e) => {
		e.preventDefault();
		await messageRef.add({
			text: msgInput,
			createdAt: FieldValue.serverTimestamp(),
			senderId: sender.user.userId,
			receiverId: receiver,
		});
		setMsgInput("");

		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	let [messages] = useCollectionData(query, { idField: "id" });

	messages =
		messages &&
		messages.filter(
			(el) =>
				(el.senderId === sender.user.userId && el.receiverId === receiver) ||
				(el.senderId === receiver && el.receiverId === sender.user.userId)
		);

	console.log(messages);
	return (
		<div className='col-span-2 border border-gray-primary border-l-0'>
			<header className=' h-16 border-b bg-white border-gray-primary '></header>
			<div className='flex flex-col '>
				<div
					id='messageContainer'
					className='h-[60vh]  overflow-auto'>
					{messages &&
						messages.map((msg) => {
							let isSender = true;
							if (
								msg.senderId === receiver &&
								msg.receiverId === sender.user.userId
							) {
								isSender = false;
								console.log(isSender);
							}
							return (
								<ChatMessage
									key={msg.id}
									text={msg.text}
									senderId={msg.senderId}
									receiverId={msg.receiverId}
									sender={sender.user.userId}
									receiver={receiver}
									isSender={isSender}
								/>
							);
						})}
					<div ref={dummy}></div>
				</div>
				{receiver ? (
					<form
						onSubmit={sendMessage}
						className='m-3 border bg-white border-gray-primary flex h-12 rounded-3xl overflow-hidden'>
						<input
							type='text'
							value={msgInput}
							onChange={(e) => setMsgInput(e.target.value)}
							className='w-full border-none outline-none p-4'
						/>
						<button className='w-28 text-blue-medium'>Send</button>
					</form>
				) : null}
			</div>
		</div>
	);
}

export default Inbox;
