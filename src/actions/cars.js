//Action: Add car
export const addCar = 
({carName = '', id = '', price = 0, isPublic = false} = {}) => ({
    type: 'ADD_CAR',
    car: {
        carName,
        price,
        id,
        isPublic
    }
});

//Action: Remove car
export const removeCar = ({ id } = {}) => ({
    type: 'REMOVE_CAR',
    id
});


//Action: Clear cars
export const clearCar = () =>({
    type: 'CLEAR_CAR'
    
});

//Action: Make public
export const makePublic = ({ index } = {}) => ({
    type: 'MAKE_PUBLIC',
    index,    
});

export const makePrivate = ({ index }) => ({
    type: 'MAKE_PRIVATE',
    index,

});