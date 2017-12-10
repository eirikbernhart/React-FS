//Action: Set socket
export const setSocket = ({inSocket} = {}) => ({
    type: 'SET_SOCKET',
    inSocket
});

//Action: Clear socket
export const clearSocket = ({} = {}) => ({
    type: 'CLEAR_SOCKET',
});
