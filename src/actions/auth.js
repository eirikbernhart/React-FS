//Action: Authenticate user
export const authenticateUser = 
({username, authenticated = false, visited = false} = 
{}) =>({
    type: 'AUTHENTICATE_USER',
        username,
        authenticated,
        visited
    
});

//Action: UnAuthenticate user
export const unAuthenticateUser = 
({username = '', authenticated = false, visited = false} = 
{}) =>({
    type: 'UNAUTHENTICATE_USER',
        username,
        authenticated,
        visited
    
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