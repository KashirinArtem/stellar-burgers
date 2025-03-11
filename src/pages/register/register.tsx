import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  userRegistration,
  clearError,
  isAuthenticatedSelector,
  errorMsgSelector
} from '../../slices/auth.slice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(errorMsgSelector);
  const navigate = useNavigate();
  const authenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  // useEffect(() => {
  //   if (authenticated) navigate('/');
  // }, [authenticated]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      userRegistration({
        name: userName,
        email: email,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
