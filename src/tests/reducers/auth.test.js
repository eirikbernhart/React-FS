import authReducer from '../../reducers/auth';



test('should setup default auth-state', () => {
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        authenticated: false,
        username: ''

    })
});