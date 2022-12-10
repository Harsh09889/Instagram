import React, { Fragment } from "react";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Navigate,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import userContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Messages = React.lazy(() => import("./pages/Messages"));

function App() {
	const { user } = useAuthListener();

	return (
		<userContext.Provider value={{ user }}>
			<Router>
				<Fragment />
				<React.Suspense
					fallback={
						<div>
							<h1>loading...</h1>
						</div>
					}>
					<Routes>
						<Route
							path={ROUTES.LOGIN}
							element={<IsUserLoggedIn user={user} />}>
							<Route
								path={ROUTES.LOGIN}
								element={<Login />}
							/>
						</Route>

						<Route
							path={ROUTES.SIGN_UP}
							element={<IsUserLoggedIn user={user} />}>
							<Route
								path={ROUTES.SIGN_UP}
								element={<Signup />}
							/>
						</Route>

						<Route
							path={ROUTES.PROFILE}
							element={<Profile />}
						/>

						<Route
							path={ROUTES.MESSAGES}
							element={<ProtectedRoute user={user} />}>
							<Route
								path={ROUTES.MESSAGES}
								element={<Messages />}
							/>
						</Route>

						<Route
							path={ROUTES.DASHBOARD}
							element={<ProtectedRoute user={user} />}>
							<Route
								path={ROUTES.DASHBOARD}
								element={<Dashboard />}
							/>
						</Route>

						<Route
							path={ROUTES.NOT_FOUND}
							element={<NotFound />}
						/>
						<Route
							path='*'
							element={
								<Navigate
									to={ROUTES.NOT_FOUND}
									replace
								/>
							}
						/>
					</Routes>
				</React.Suspense>
			</Router>
		</userContext.Provider>
	);
}

export default App;
