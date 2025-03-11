import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import {
  isAuthenticatedSelector,
  isUserRequestSelector,
  userSelector
} from '../../slices/auth.slice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}
export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: IProtectedRouteProps) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isUserRequest = useSelector(isUserRequestSelector);
  const location = useLocation();

  if (!isAuthenticated && isUserRequest) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/profile' };
    return <Navigate replace to={from} state={location} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
