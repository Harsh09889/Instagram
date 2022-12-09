import { useContext } from 'react';
import userContext from '../context/user';
import firebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

function Header() {
	const { firebase } = useContext(firebaseContext);
	const { user } = useContext(userContext);

	return (
		<header className='bg-white h-16 border-b  border-gray-primary mb-8'>
			<div className='container mx-auto max-w-screen-lg h-full'>
				<div className='flex justify-between h-full'>
					<div className='text-gray-700 text-center flex items-center cursor-pointer'>
						<h1 className='flex justify-center w-full'>
							<a href={ROUTES.DASHBOARD}>
								<img
									src='/images/logo.png'
									alt='Instagram'
									className='mt-2 w-6/12'
								/>
							</a>
						</h1>
					</div>
					<div className='text-gray-700 text-center flex items-center justify-center'>
						{user ? (
							<>
								<a
									href={ROUTES.DASHBOARD}
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
								</a>
								<button
									type='button'
									title='Sign Out'
									onClick={() => firebase.auth().signOut()}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
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
								<div className='flex items-center cursor-pointer'>
									<a
										href={`/p/${user.displayName}`}
										title={`${user.displayName}`}>
										<img
											src={`/images/avatars/${user.displayName}.jpg`}
											alt={`${user.displayName} profile`}
											className='rounded-full h-8 w-8 flex'
											onError={(e) => {
												e.target.onError = null;
												e.target.src = '/images/avatars/default.png';
											}}
										/>
									</a>
								</div>
							</>
						) : (
							<>
								<a href={ROUTES.LOGIN}>
									<button className='bg-blue-medium w-20 h-8 rounded text-white font-bold text-sm'>
										Login
									</button>
								</a>

								<a href={ROUTES.SIGN_UP}>
									<button className='w-20 h-8 rounded font-bold text-blue-medium'>
										Signup
									</button>
								</a>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
