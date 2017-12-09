



import { addCar, removeCar, clearCar, makePublic, makePrivate } from '../../actions/cars/';



test('Should setup add_car action object', () => {
    const testCar = {
        
            carName: "Ford",
            price: 123321,
            id: 'HabaBaba',
            isPublic: false
        
        
    }

    const action = addCar(

        { carName: "Ford",
            price: 123321,
            id: 'HabaBaba',
            isPublic: false
        }
    );



    expect(action).toEqual({
        type: 'ADD_CAR',
        car: {
            carName: "Ford",
            price: 123321,
            id: 'HabaBaba',
            isPublic: false
        }
    });
});

test('Should setup remove_car action object', () => {

    const action = removeCar({ id: 'testid'});
    expect(action).toEqual({
        type: 'REMOVE_CAR',
        id: 'testid'
    });

});

test('Should setup clear_car action object', () => {

    const action = clearCar();
    expect(action).toEqual({
        type: 'CLEAR_CAR',
       
    });

});

test('Should setup make_public action object', () => {

    const action = makePublic({ index: 333 });
    expect(action).toEqual({
        type: 'MAKE_PUBLIC',
        index: 333
    });
});

test('Should setup make_private action object', () => {

    const action = makePrivate({ index: 333 });
    expect(action).toEqual({
        type: 'MAKE_PRIVATE',
        index: 333
    });
});