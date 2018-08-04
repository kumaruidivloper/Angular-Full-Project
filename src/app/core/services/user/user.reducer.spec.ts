import { User, UserGroup, UserSite, UserState } from './user.model';
import { getUser, userDefaultState, userReducer, getUserGroups, getUserSites } from './user.reducer';
import { GetUserGroupsSuccess, GetUserSitesSuccess, GetUserSuccess, UserActions } from './user.actions';

describe('UserReducer', () => {
  const user: User = { firstName: 'test', lastName: 'test' };
  const userGroups: UserGroup[] = [{id: '1', groupId: '1', groupName: 'test'}];
  const userSites: UserSite[] = [{id: '1', siteId: '1', siteName: 'test'}];
  let initialState: UserState;

  beforeEach(() => {
    initialState = userDefaultState;
  });

  it('should return the state', () => {
    expect(userReducer(initialState, {} as UserActions)).toBe(initialState);
  });

  it('should update the user on GET_USER_SUCCESS', () => {
    const state = userReducer(initialState, new GetUserSuccess(user));

    expect(state.user).toEqual(user);
  });

  it('should update groups on GET_USER_GROUP_SUCCESS', () => {
    const state = userReducer(initialState, new GetUserGroupsSuccess(userGroups));

    expect(state.groups).toEqual(userGroups);
  });

  it('should update sites on GET_USER_SITES_SUCCESS', () => {
    const state = userReducer(initialState, new GetUserSitesSuccess(userSites));

    expect(state.sites).toEqual(userSites);
  });

  describe('getters', () => {
    it('should get the user', () => {
      expect(getUser(initialState)).toBe(initialState.user);
    });

    it('should get the groups', () => {
      expect(getUserGroups(initialState)).toBe(initialState.groups);
    });

    it('should get the user', () => {
      expect(getUserSites(initialState)).toBe(initialState.sites);
    });
  });


});
