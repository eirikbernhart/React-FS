import carsReducer from '../../reducers/cars';
import cars from  '../fixtures/cars';



test('should setup default cars-state', () => {
    const state = carsReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([])
});

test('should remove car by ID', () => {
    const action = {
        type: 'REMOVE_CAR',
        id: cars[0].id
    }

    const state = carsReducer(cars, action);
    expect(state).toEqual([cars[1], cars[2]]);
    expect(state.length).toBe(2);
});

test('should not remove car if ID is not found', () => {
    const action = {
        type: 'REMOVE_CAR',
        id: 'ksajkdjsads'
    }

    const state = carsReducer(cars, action);
    expect(state.length).toBe(cars.length);
});

test('should add car to cars array', () => {
    const action = {
        type: 'ADD_CAR',
        car: cars[1]
    }

    const state = carsReducer(cars, action);
    expect(state.length).toBe(cars.length + 1);
});