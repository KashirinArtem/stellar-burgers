import { ReactNode } from 'react';

interface IProtectedRouteProps {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: IProtectedRouteProps) => children;
