import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

function Signup() {
	const navigate = useNavigate();

	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleSignup = async (e) => {
		e.preventDefault();

		const usernameExsits = await doesUsernameExist(username);

		if (!usernameExsits.length) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				// authentication using email and password and username (display name)
				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				// firebase user collection (create a document)
				let usernameToAdd = username.toLowerCase();
				let emailToAdd = emailAddress.toLowerCase();
				let dateCreated = Date.now();

				await firebase.firestore().collection("users").add({
					userId: createdUserResult.user.uid,
					username: usernameToAdd,
					fullName,
					emailAddress: emailToAdd,
					following: [],
					dateCreated,
				});

				navigate(ROUTES.DASHBOARD);
			} catch (error) {
				setFullName("");
				setUsername("");
				setEmailAddress("");
				setPassword("");
				setError(error.message);
			}
		} else {
			setError("That uesrname is already taken please try another one!!!");
		}
	};

	useEffect(() => {
		document.title = "Signup - Instagram";
	}, []);

	return (
		<div className='container flex mx-auto max-w-screen-md items-center h-screen px-3'>
			<div className='sm:flex hidden sm:w-3/5'>
				<img
					src='/images/iphone-with-profile.jpg'
					alt='iphone-profile'
				/>
			</div>
			<div className='w-full sm:w-2/5 max-w-sm mx-auto'>
				<div className='flex bg-white flex-col p-4 w-full mr-3 mb-4 items-center rounded border border-gray-primary'>
					<h1 className='w-full justify-center flex'>
						<img
							src='/images/logo.png'
							alt='Instagram'
							className='mt-2 w-6/12 mb-4'
						/>
					</h1>

					{error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

					<form
						onSubmit={handleSignup}
						method='POST'
						className='w-full'>
						<input
							type='text'
							aria-label='Enter Your Username'
							placeholder='Username'
							className='bg-white text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
						<input
							type='text'
							aria-label='Enter Your Full Name'
							placeholder='Full Name'
							className='bg-white text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setFullName(e.target.value)}
							value={fullName}
						/>
						<input
							type='text'
							aria-label='Enter Your Email Address'
							placeholder='Email Address'
							className='bg-white text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setEmailAddress(e.target.value)}
							value={emailAddress}
						/>
						<input
							type='password'
							aria-label='Enter Password'
							placeholder='Password'
							className='bg-white text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<button
							disabled={isInvalid}
							type='submit'
							className={`
								bg-blue-medium
								text-white
								w-full
								rounded
								h-8
								font-bold
								${isInvalid && "opacity-50"}
								`}>
							Signup
						</button>
					</form>
				</div>
				<div className='flex justify-center w-full bg-white py-4 border border-gray-primary rounded items-center'>
					<p className='text-sm'>
						Have an account ?{" "}
						<span
							onClick={(e) => navigate(ROUTES.LOGIN)}
							className='font-bold text-blue-medium cursor-pointer'>
							{" "}
							Login
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
