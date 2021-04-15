import { TODOS_ACTION } from '../Actions/actionfiles';

const initialTodos = {
    todos: [
        {
            "id": "60733977009de2dd10750c7f",
            "group": "To Dos",
            "tasks": []
        }
    ]
};

const todosReducer = (state,action) => {
    state = state || initialTodos;
    console.log(action);
    switch (action.type) {
        case TODOS_ACTION.USER_TODOS:
            return { ...state, todos:  [...action.payload] }
        case TODOS_ACTION.FAV_TOGGLE: {
            const ntodos = state.todos.map(todo=> {
                if(todo._id === action.payload.tid){
                    todo.favorite = !todo.favorite
                }
                return todo;
            })
            return { ...state, todos:  [...ntodos] }
        }
            
        case TODOS_ACTION.TODO_COMPLETE: {
            const ntodos = state.todos.map(todo=> {
                if(todo._id === action.payload.tid){
                    todo.complete = !todo.complete
                }
                return todo;
            })
            return { ...state, todos:  [...ntodos] }
        }
            
        case TODOS_ACTION.TODO_DELETE:
            return { ...state, todos:  [...state.todos.filter(todo=> todo._id !== action.payload.tid )] }
        default:
            return state
    }
};

export default todosReducer;