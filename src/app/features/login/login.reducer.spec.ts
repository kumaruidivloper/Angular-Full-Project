import { getToken, loginDefaultState, loginReducer, LoginState } from './login.reducer';
import { UserLoginActions, UserLoginSuccess, UserLogOutSuccess } from './login.actions';

describe('login reducer', () => {
  let state: LoginState;
  const token: string = 'test token';

  beforeEach(() => {
    state = loginDefaultState;
  });

  it('should return the state', () => {
    expect(loginReducer(state, {} as UserLoginActions)).toEqual(state);
  });

  it('should update the token when LOGIN_SUCCESS action is dispatched', () => {
    expect(loginReducer(state, new UserLoginSuccess(token)).token).toEqual(token);
  });

  it('should clear the user when LOGOUT_SUCCESS action is dispatched', () => {
    state.token = token;
    expect(loginReducer(state, new UserLogOutSuccess()).token).toBeNull();
  });

  describe('selectors', () => {
    it('should get the user', () => {
      state.token = token;
      expect(getToken(state)).toBe(token);
    });
  });
});
