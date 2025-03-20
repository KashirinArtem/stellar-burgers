import reducer, { getIngredients, initialState } from "../src/slices/ingredients.slice"

describe('Тест ingredients', () => {
    const mockData = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        }
      ];

    it('[#1] При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true', () => {
        const state = reducer(initialState, getIngredients.pending('pending'));

        expect(state.isIngredientsLoaded).toBeTruthy();
        expect(state.error).toBeNull();
    });

    it('[#2] При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false', () => {
        const state = reducer(initialState, getIngredients.rejected(new Error('error'), 'rejected'));

        expect(state.isIngredientsLoaded).toBeFalsy();
        expect(state.error).toEqual('error');
    });

    it('[#3] При вызове экшена Success и передаче в него ингредиентов эти данные записываются в стор и store.isLoading меняется на false', () => {
        const state = reducer(initialState, getIngredients.fulfilled(mockData, 'fulfilled'));

        expect(state.isIngredientsLoaded).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.ingredients).toEqual(mockData);

    });
})