import { useParams } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Contacts from "../components/Messages/Contacts";
import Inbox from "../components/Messages/Inbox";

function Messages() {
	// const [isUserLoggedInUser, setIsUserLoggedInUser] = useState(false);
	const { user } = useUser();
	const { username } = useParams();
	const navigate = useNavigate();

	const [receiver, setReceiver] = useState("");

	const isUserLoggedInUser = user.username && user.username === username;
	if (user.username && !isUserLoggedInUser) {
		navigate(ROUTES.NOT_FOUND);
	}

	return isUserLoggedInUser ? (
		<div className='bg-gray-background'>
			<Header />
			<div className='mx-auto max-w-screen-lg'>
				<div className='grid grid-cols-3 bg-white justify-between max-w-screen-lg w-11/12 mx-auto h-full'>
					<Contacts
						receiver={receiver}
						setReceiver={setReceiver}
					/>
					<Inbox receiver={receiver} />
				</div>
			</div>
		</div>
	) : null;
}

export default Messages;
