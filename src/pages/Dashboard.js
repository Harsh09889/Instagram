import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Index';
import Timeline from '../components/Timeline';

function Dashboard() {
	useEffect(() => {
		document.title = 'Instagram';
	}, []);

	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='grid grid-cols-3 gap-6 justify-between max-w-screen-lg w-11/12 mx-auto'>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
}

export default Dashboard;
