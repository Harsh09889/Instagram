import { Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user }) {
	return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}
