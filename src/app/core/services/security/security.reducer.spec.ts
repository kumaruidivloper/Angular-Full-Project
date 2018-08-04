import { getCurrentUser, initialState, securityReducer } from './security.reducer';
import { User } from './user.model';
import { LoginSuccess, TryLogin, TryLoginFailed } from './security.actions';
import { async } from '@angular/core/testing';

describe('SecurityReducer', () => {

  const testUser: User = {
    city: '',
    client_id: '',
    email: '',
    exp: 0,
    firstName: '',
    lastName: '',
    memberOf: '',
    scope: [],
    userName: '',
    username: '',
    country: ''
  },
  testToken = 'test';

  it('should return state with new user data on LoginSuccess', async(() => {
    const state = securityReducer(initialState, new LoginSuccess(testUser, testToken));
    expect(state.currentUser).toEqual(testUser);
  }));

  it('should return state with no user data on TryLoginFailed', async(() => {
    const state = securityReducer(initialState, new TryLoginFailed());
    expect(state.currentUser).toEqual(null);
  }));

  it('should return state with no user data', async(() => {
    const state = securityReducer(initialState, new TryLogin());
    expect(state.currentUser).toEqual(initialState.currentUser);
  }));

  describe('getter functions', () => {
    it('should get currentUser', () => {
      expect(getCurrentUser(initialState)).toBe(initialState.currentUser);
    });
  });
});
