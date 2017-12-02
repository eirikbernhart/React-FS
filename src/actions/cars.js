


//Action: Add car
export const addCar = 
({carName = '', id = '', price = 0} = {}) => ({
    type: 'ADD_CAR',
    car: {
        carName,
        price,
        id
    }
});

//Action: Remove car
export const removeCar = ({ id } = {}) => ({
    type: 'REMOVE_CAR',
    id
});

//Action: Search car
export const searchCar = ( name ) =>({
    type: 'SEARCH_CAR',
    name
});

//Action: Clear cars
export const clearCar = () =>({
    type: 'CLEAR_CAR'
});