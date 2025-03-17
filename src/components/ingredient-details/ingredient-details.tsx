import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../slices/ingredients.slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector(ingredientsSelector).find(
    (ing) => ing._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
