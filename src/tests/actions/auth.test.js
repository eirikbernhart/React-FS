import { authenticateUser, unAuthenticateUser, pageVisited } from '../../actions/auth/';



test('Should setup authenticateUser_car action object', () => {
    const action = authenticateUser({ username: 'Zlad Supersonik', authenticated: true, visited: true});
    expect(action).toEqual({
        type: 'AUTHENTICATE_USER',
        username: 'Zlad Supersonik',
        authenticated: true,
        visited: true
    });
});

test('Should setup UnAuthenticateUser_car action object', () => {
    const action = unAuthenticateUser({ username: 'Zlad Supersonik', authenticated: false, visited: false});
    expect(action).toEqual({
        type: 'UNAUTHENTICATE_USER',
        username: 'Zlad Supersonik',
        authenticated: false,
        visited: false
    });
});

test('Should setup page_visited action object', () => {
    const action = pageVisited({visited: true});
    expect(action).toEqual({
        type: 'PAGE_VISITED',
            pageInfo: {
                visited: true
            }
    });
});