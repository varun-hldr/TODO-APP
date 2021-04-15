import { combineReducers } from 'redux';
import authReducer from './auth';
import todosReducer from './todos';





export default combineReducers({
    auth: authReducer,
    todos: todosReducer
   
});