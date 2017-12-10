const carsReducerDefaultState = {inSocket: null};

export default (state = carsReducerDefaultState, action) => {


    switch(action.type) {
        case 'SET_SOCKET':
            return {
                ...state,
                inSocket: action.inSocket
                
            };
            case 'CLEAR_SOCKET':
            return {
                ...state,
                socket: null
            };
            default:
                    return state;
            }
}