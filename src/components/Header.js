import { useContext } from "react";
import userContext from "../context/user";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const { firebase } = useContext(firebaseContext);
	const { user } = useContext(userContext);
	const navigate = useNavigate();

	return (
		<header className='bg-white h-16 border-b p-4 pt-0 pb-0 border-gray-primary mb-8'>
			<div className='container mx-auto max-w-screen-lg h-full'>
				<div className='flex justify-between h-full'>
					<div className='text-gray-700 text-center flex items-center cursor-pointer'>
						<h1 className='flex justify-center w-full'>
							<Link to={ROUTES.DASHBOARD}>
								<img
									src='/images/logo.png'
									alt='Instagram'
									className='mt-2 w-6/12'
								/>
							</Link>
						</h1>
					</div>
					<div className='text-gray-700 text-center flex items-center justify-center'>
						{user ? (
							<>
								<Link
									to={ROUTES.DASHBOARD}
									title='Instagram'>
									<svg
										className='w-8 h-8 mr-6 text-black-light cursor-pointer'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
										/>
									</svg>
								</Link>

								<button
									type='button'
									title='Sign Out'
									onClick={() => firebase.auth().signOut()}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											firebase.auth().signOut();
										}
									}}>
									<svg
										className='w-8 h-8 mr-6 text-black-light cursor-pointer'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
										/>
									</svg>
								</button>

								<button
									type='button'
									title={`Messages`}
									onClick={() => navigate(`/p/${user.displayName}/messages`)}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											firebase.auth().signOut();
										}
									}}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-8 h-8 mr-6 text-black-light cursor-pointer'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
										/>
									</svg>
								</button>

								<div className='flex items-center cursor-pointer'>
									<Link
										to={`/p/${user.displayName}`}
										title={`${user.displayName}`}>
										<img
											src={`/images/avatars/${user.displayName}.jpg`}
											alt={`${user.displayName} profile`}
											className='rounded-full h-8 w-8 flex'
											onError={(e) => {
												e.target.onError = null;
												e.target.src = "/images/avatars/default.png";
											}}
										/>
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button className='bg-blue-medium w-20 h-8 rounded text-white font-bold text-sm'>
										Login
									</button>
								</Link>

								<Link to={ROUTES.SIGN_UP}>
									<button className='w-20 h-8 rounded font-bold text-blue-medium'>
										Signup
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
