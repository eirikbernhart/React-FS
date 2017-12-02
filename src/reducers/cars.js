



const carsReducerDefaultState = [];

export default (state = carsReducerDefaultState, action) => {

    switch(action.type) {
        case 'ADD_CAR':
            return [
                ...state,
                action.car
            ];
        case 'REMOVE_CAR':
            return state.filter(({ id }) => id !== action.id);
        case 'CLEAR_CAR':
            return []
        default:
            return state;
    }


}