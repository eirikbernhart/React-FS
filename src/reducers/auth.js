const userReducerDefaultState = {username : '', authenticated : false};

export default (state = userReducerDefaultState, action) => {
    
        switch(action.type) {
            case 'AUTHENTICATE_USER':
                return {
                    ...state,
                    username: action.username,
                    authenticated: true,
                    visited: false
                }   
            
            case 'UNAUTHENTICATE_USER':
                return {
                    ...state,
                    authenticated: false,
                    visited: false
                }   
            case 'PAGE_VISITED':
                return {
                    ...state,
                    visited: true
                }
            default:
                return state;
        }
    
    
    }