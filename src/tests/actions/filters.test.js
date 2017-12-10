import { setTextFilter } from '../../actions/filters/';



test('Should setup setTextFilter action object', () => {
    const action = setTextFilter('Troll');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Troll'
    });
});