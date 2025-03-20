import exp from "constants";
import reducer, { add, clearConstructor, deleteItem, initialState, moveDown, moveUp } from "../src/slices/constructorBurger.slice"
import store from "../src/services/store";

describe('Тест constructorBurger', () => {
    const bunMock = {
        _id: '643d69a5c3f7b9001cfa093c',
        id: '',
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
      };

      const ingredientMock = {
        _id: '643d69a5c3f7b9001cfa093e',
        id: '',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      };

      const mockData = [
        {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: ''
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        id: ''
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: ''
      }
    ]


    it('[#1] Обработка экшена добавления ингредиента', () => {

        const state = reducer(initialState, add(bunMock));

        bunMock.id = state.bun.id;

        expect(state.bun).toEqual(bunMock);
        expect(state.ingredients).toHaveLength(0);
    });

    it('[#2] Обработка экшена удаления ингредиента', () => {  
        // bun
        expect(reducer(initialState, deleteItem(bunMock)).bun).toEqual(null);
        
        //ingredient
        expect(reducer(initialState, add(ingredientMock)).ingredients).toHaveLength(1);
        expect(reducer(initialState, deleteItem(ingredientMock)).ingredients).toHaveLength(0);
    });

    it('[#3] Обработку экшена изменения порядка ингредиентов в начинке(up)', () => {  
        const initState = {
            bun: null,
            ingredients: [...mockData]
        };
        const state = reducer(initState, moveUp(1));
        expect(state.ingredients[0].name).toBe('Мини-салат Экзо-Плантаго');
    });

    it('[#4] Обработку экшена изменения порядка ингредиентов в начинке(down)', () => {  
        const initState = {
            bun: null,
            ingredients: [...mockData]
        };
        const state = reducer(initState, moveDown(1));
        expect(state.ingredients[2].name).toBe('Мини-салат Экзо-Плантаго');
    });

    it('[#5] Очитска конструктора', () => {  
        const initState = {
            bun: bunMock,
            ingredients: [...mockData]
        };
        const state = reducer(initState, clearConstructor());
        expect(state.ingredients).toHaveLength(0);
        expect(state.bun).toBeNull;
    });
})