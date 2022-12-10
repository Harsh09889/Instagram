import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

function Login() {
	const navigate = useNavigate();

	const { firebase } = useContext(FirebaseContext);
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = "Login - Instagram";
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
						onSubmit={handleLogin}
						method='POST'
						className='w-full'>
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
							Login
						</button>
					</form>
				</div>
				<div className='flex justify-center w-full bg-white py-4 border border-gray-primary rounded items-center'>
					<p className='text-sm'>
						Don't have an account ?{" "}
						<span
							onClick={(e) => navigate(ROUTES.SIGN_UP)}
							className='font-bold text-blue-medium cursor-pointer'>
							{" "}
							Sign up
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
