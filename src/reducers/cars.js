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
        case 'MAKE_PUBLIC':
            return Object.assign(
                [...state],
                {[action.index]:
                Object.assign({}, state[action.index], {
                    isPublic: true
                })}
            )
        case 'MAKE_PRIVATE':
        console.log("INDEX CORRECT: " + action.index);
            return Object.assign(
                [...state],
                {[action.index]:
                Object.assign({}, state[action.index], {
                    isPublic: false
                })}
            )
        default:
            return state;
    }


}