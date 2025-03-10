import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  errorMsgSelector,
  isAuthenticatedSelector,
  loginUser
} from '../../slices/auth.slice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(errorMsgSelector);
  const navigate = useNavigate();
  const authenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (authenticated) navigate('/profile', { replace: true });
    else navigate('/login', { replace: true });
  }, [authenticated]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
