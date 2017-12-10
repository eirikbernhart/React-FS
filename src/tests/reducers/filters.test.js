import filtersReducer from '../../reducers/filters';



test('should setup default filter-state', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',

    })
});

test('should set  filter by text-values', () => {
    const text = 'Kewl';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);

});