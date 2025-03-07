import { registerUserApi, TAuthResponse, TRegisterData } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// регистрация registerUserApi
// вход loginUserApi
// выход logoutApi
// востановить forgotPasswordApi
interface IErrorAuth {
    message: string;
    success: boolean
}

export interface IAuthState {
  isAuthenticated: boolean;
  authResponse: TAuthResponse | null; // ???
  isUserRequest: boolean;
  errorRegisterUser: IErrorAuth
}

const initialState: IAuthState = {
  authResponse: null,
  isUserRequest: false,
  isAuthenticated: false,
  errorRegisterUser: {
    message: '',
    success: false
  }
};

export const userRegistration = createAsyncThunk(
  'registration/user',
  async (user: TRegisterData) => registerUserApi(user)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    authResponseSelector: (state) => state.authResponse,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    isUserRequestSelector: (state) => state.isUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.isUserRequest = true;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isUserRequest = false;
        state.errorRegisterUser = action.payload as IErrorAuth;
        console.log('userRegistration', action.payload);
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isUserRequest = false;
        state.isAuthenticated = true;
        state.authResponse = action.payload;
      });
  }
});

export const {
  authResponseSelector,
  isAuthenticatedSelector,
  isUserRequestSelector
} = authSlice.selectors;
export default authSlice.reducer;
