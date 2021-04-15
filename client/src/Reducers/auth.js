import { AUTH_ACTION } from '../Actions/actionfiles';

const initialAuth = {
    token: null,
    isAuthenticated: false
};

const authReducer = (state,action) => {
    state = state || initialAuth;
    switch (action.type) {
        case AUTH_ACTION.LOGIN:
            return { token:  action.payload, isAuthenticated:true }
        case AUTH_ACTION.LOGOUT:
            return { token:  null, isAuthenticated:false }
        default:
            return state
    }
};

export default authReducer;