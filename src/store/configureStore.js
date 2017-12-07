import { createStore, combineReducers } from 'redux';
import carsReducer from '../reducers/cars';
import userReducer from '../reducers/auth';
import filtersReducer from '../reducers/filters';
import socketReducer from '../reducers/socket';




export default () => {
    const store = createStore(
        combineReducers({
            cars: carsReducer,
            auth: userReducer,
            filters: filtersReducer,
            activeSocket: socketReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store
};
