import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerSelector,
  clearConstructor,
  IBurgerConstructorState
} from '../../slices/constructorBurger.slice';
import { useDispatch, useSelector } from '../../services/store';
import { isAuthenticatedSelector } from '../../slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import {
  isOrderRequestSelector,
  orderSelector,
  postOrder,
  removeOrder
} from '../../slices/order.slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: IBurgerConstructorState = useSelector(burgerSelector);
  const isAuth = useSelector(isAuthenticatedSelector);
  const orderRequest = useSelector(isOrderRequestSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderModalData = useSelector(orderSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) return navigate('/login', { replace: true });

    dispatch(
      postOrder([
        constructorItems.bun._id!,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id!
      ])
    );

    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(removeOrder());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (s: number, v: TIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
