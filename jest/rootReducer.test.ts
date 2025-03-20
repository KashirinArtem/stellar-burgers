import { error } from 'console';
import store, {rootReducer} from '../src/services/store';

describe('Тест rootReducer', () => {
    it('[#1] Тестированеие корневого редьюсера', () => {    
        const likeInitState = { 
            ingredients: {
                ingredients: [],
                isIngredientsLoaded: false,
                error: null
            },
            constructorBurger: {
                bun: null,
                ingredients: []
            },
            feed: {
                orders: [],
                isOrdersLoading: false,
                order: null,
                isOrderLoading: false,
                total: 0,
                totalToday: 0
            },
            auth: {
                user: null,
                isUserRequest: false,
                isAuthenticated: false,
                errorMsg: '',
                orders: [],
                isOrderRequest: false
            },
            order: {
                order: null,
                isOrderRequest: false,
                errorMsg: '' 
            }
        };
    
        expect(store.getState()).toEqual(rootReducer(likeInitState, {type: 'unknown'}));
          
    })
})




