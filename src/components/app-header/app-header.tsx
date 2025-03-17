import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelector } from '../../slices/auth.slice';

export const AppHeader: FC = () => {
  const name = useSelector(userSelector)?.name;

  return <AppHeaderUI userName={name} />;
};
