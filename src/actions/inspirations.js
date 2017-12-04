//Action: Add car
export const addInspCar = 
({carName = '', id = '', price = 0} = {}) => ({
    type: 'ADD_INSP_CAR',
    car: {
        carName,
        price,
        id
    }
});

//Action: Remove car
export const removeInspCar = ({ id } = {}) => ({
    type: 'REMOVE_INSP_CAR',
    id
});