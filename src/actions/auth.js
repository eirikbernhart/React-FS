



//Action: Authenticate user
export const authenticateUser = 
({userName = '', authenticated = false, visited = false} = 
{}) =>({
    type: 'AUTHENTICATE_USER',
    user: {
        userName,
        authenticated,
        visited
    }
});

//Action: UnAuthenticate user
export const unAuthenticateUser = 
({userName = '', authenticated = false, visited = false} = 
{}) =>({
    type: 'UNAUTHENTICATE_USER',
    user: {
        userName,
        authenticated,
        visited
    }
});

//Action: Track if page has been visited 
export const pageVisited =
({visited = false} =
{}) => ({
    type: 'PAGE_VISITED',
    pageInfo: {
        visited
    }
});