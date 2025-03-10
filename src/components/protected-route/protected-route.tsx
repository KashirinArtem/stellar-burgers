import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import {
  isAuthenticatedSelector,
  isUserRequestSelector
} from '../../slices/auth.slice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean; // ???
}
export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: IProtectedRouteProps) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isUserRequest = useSelector(isUserRequestSelector);
  const location = useLocation();

  if (!isAuthenticated && isUserRequest) return <Preloader />;

  if (!onlyUnAuth && !isAuthenticated)
    return <Navigate replace to='/login' state={{ to: location }} />;

  if (!onlyUnAuth && isAuthenticated) {
    return <Navigate replace to='/' state={location} />;
  }

  return children;
};
