import { useEffect } from "react";
import Header from "../components/Header";

function NotFound() {
	useEffect(() => {
		document.title = "Not found - Instagram";
	}, []);

	return (
		<>
			<Header />
			<div className='h-[ 4rem] bg-gray-background flex items-center justify-center'>
				<h1 className='text-xl font-bold'>
					You are Lost, most likely in someone's thoughts{" "}
				</h1>
			</div>
		</>
	);
}

export default NotFound;
