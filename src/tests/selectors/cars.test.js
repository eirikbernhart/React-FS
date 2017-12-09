

import selectCars from '../../selectors/cars';

test('Should filter by text-value', () => {

    const filters = {
        text: 'e'
    };

    const cars = [
        {
            carName: 'BMW X6',
            price: 32000,
            id: 'abccdse',
            isPublic: true,
        },

        {
            carName: 'Bentley Continental',
            price: 132000,
            id: 'sffsd',
            isPublic: true,
        },

        {
            carName: 'lancia Delta',
            price: 36000,
            id: 'hfhhgfhg',
            isPublic: false,
        },
]

    const result = selectCars(cars, filters);
    expect(result).toEqual([cars[1], cars[2]]);
});