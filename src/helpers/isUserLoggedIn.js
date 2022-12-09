import { Outlet, Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function IsUserLoggedIn({ user }) {
	return !user ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} />;
}
