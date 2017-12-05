



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

/**
 * 
 * 
 * case 'MAKE_PUBLIC_X':
            return {
                ...state, car: 
                {
                    ...state.car, isPublic: true
                }
            }

 * case 'MAKE_PUBLIC_X1':
            console.log("Får jeg ID i reducer: " + action.id);
            console.log("HVA ER DENNE SJUKE STATEN: " + JSON.stringify(state[0].id));
            let arr = state.map((currentItem, index) => {
                if(currentItem.id === action.id) {
                    console.log("FOUND THE CORRECT ITEM at index:  " + index);
                    console.log("FOUND ITEM IS:  " + JSON.stringify(currentItem));
                    
                    return ((currentItem) => {
                        console.log("HVA BLIR DET TIL SLUTT: " + JSON.stringify(currentItem))
                    })
                                                       
                } else {
                    
                }
        )
    return state; //TESTING...
 * 
 */