

import { setSocket, clearSocket } from '../../actions/socket/';


test('Should setup setSocket action object', () => {
    const action = setSocket({insocket: {id: 'lskadmdsija234243432¤%'}});
    expect(action).toBeDefined();
});

test('Should setup clearSocket action object', () => {
    const action = clearSocket();
    expect(action).toEqual({
        type: 'CLEAR_SOCKET',
       
    });
});