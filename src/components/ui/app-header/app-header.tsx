import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { link } from 'fs';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <Link
              to='/'
              className={clsx(
                styles.link,
                pathname === '/' ? styles.link_active : ''
              )}
            >
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <Link
              to='/feed'
              className={clsx(
                styles.link,
                pathname.includes('feed') && styles.link_active
              )}
            >
              <ListIcon
                type={pathname.includes('feed') ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <Link
            to='/login'
            className={clsx(
              styles.link,
              pathname.includes('login') && styles.link_active
            )}
          >
            <ProfileIcon
              type={pathname.includes('login') ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
