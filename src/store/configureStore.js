import { createStore, combineReducers } from 'redux';
import carsReducer from '../reducers/cars';
import userReducer from '../reducers/auth';
import filtersReducer from '../reducers/filters';



export default () => {
    const store = createStore(
        combineReducers({
            cars: carsReducer,
            auth: userReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store
};
