import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TServerResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../src/utils/cookie';

// регистрация registerUserApi+
// вход loginUserApi+
// выход logoutApi +
// обновить updateUserApi+
// заказы getOrdersApi+
// user getUserApi+

// нужно чистить ошибку
// куда ведет после успешной регистрации???

export interface IAuthState {
  isAuthenticated: boolean;
  user: TUser | null; // ???
  isUserRequest: boolean;
  errorMsg: string;
  isOrderRequest: boolean;
  orders: TOrder[];
}

const initialState: IAuthState = {
  user: null,
  isUserRequest: false,
  isAuthenticated: false,
  errorMsg: '',
  orders: [],
  isOrderRequest: false
};

//registration
export const userRegistration = createAsyncThunk(
  'registration/user',
  async (user: TRegisterData): Promise<TUser> =>
    registerUserApi(user).then(
      ({ refreshToken, accessToken, user }: TAuthResponse) => {
        // сетим куки и хранилище
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
        return user as TUser;
      }
    )
);

// login
export const loginUser = createAsyncThunk(
  'login/user',
  async (data: TLoginData): Promise<TUser> =>
    loginUserApi(data).then(
      ({ refreshToken, accessToken, user }: TAuthResponse) => {
        // сетим куки и хранилище
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);

        return user as TUser;
      }
    )
);

// updateUser
export const updateUser = createAsyncThunk(
  'update/user',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

// logout
export const logout = createAsyncThunk('logout/user', async () =>
  // удаляем куки и чистим хранилище
  logoutApi().then((res: TServerResponse<{}>) => {
    if (res.success) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  })
);

// orders
export const getUserOrders = createAsyncThunk('orders/user', async () =>
  getOrdersApi()
);

// user
export const getUser = createAsyncThunk('get/user', async () => getUserApi());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorMsg = '';
    }
  },
  selectors: {
    userSelector: (state) => state.user,
    ordersSelector: (state) => state.orders,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    isUserRequestSelector: (state) => state.isUserRequest,
    errorMsgSelector: (state) => state.errorMsg
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('userRegistration/reject', action.error);
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('loginUser/reject', action.error);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('updateUser/reject', action.error);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('logout/reject', action.error);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isOrderRequest = true;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('getUserOrders/reject', action.error);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.isAuthenticated = true;
        state.orders = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('getUser/reject', action.error);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      });
  }
});

export const {
  userSelector,
  isAuthenticatedSelector,
  isUserRequestSelector,
  errorMsgSelector,
  ordersSelector
} = authSlice.selectors;
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
