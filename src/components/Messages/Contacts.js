import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getToMessageUsers } from "../../services/firebase";

function Contacts({ setReceiver, receiver }) {
	const { username } = useParams();
	const [followers, setFollowers] = useState([]);
	const { user } = useUser();

	useEffect(() => {
		async function followersToMessanger() {
			let ans = [];
			ans = await getToMessageUsers(user?.followers, user?.following);

			const messageProfiles =
				ans?.length > 0
					? ans.map((fol) => (
							<li
								key={fol.userId}
								onClick={(e) => setReceiver(fol.userId)}
								className={`flex gap-4 items-center p-2 cursor-pointer hover:bg-gray-primary ${
									fol.userId === receiver ? "bg-gray-primary" : ""
								}`}>
								<img
									src={`/images/avatars/${fol.username}.jpg`}
									alt={fol.username}
									className='hidden md:block h-14 w-14 rounded-full border border-gray-primary'
									onError={(e) => {
										e.target.onError = null;
										e.target.src = "/images/avatars/default.png";
									}}
								/>
								<p>{fol.fullName}</p>
							</li>
					  ))
					: [];

			setFollowers(messageProfiles);
		}

		followersToMessanger();
	}, [user.followers, user.following, receiver, setReceiver]);

	return (
		<div className='col-span-1 '>
			<header className='bg-white h-16 border  border-gray-primary grid place-items-center'>
				<h2 className='font-bold '>{username}</h2>
			</header>
			<div className='bg-white h-[70vh] overflow-auto border-l border-gray-primary border border-t-0'>
				<p className='flex justify-center  md:justify-between p-3'>
					Messages{" "}
					<span className='hidden md:inline text-blue-medium'>Requests</span>
				</p>
				<ul className='text-sm md:text-base'>{followers}</ul>
			</div>
		</div>
	);
}

export default Contacts;
