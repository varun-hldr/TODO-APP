import { PROFILE_ACTION } from '../Actions/actionfiles';

const initialProfile = {
    email: '',
    lastName: '',
    firstName: '',
    googleId: '',
    imageUrl: '',
    name: '',   
};

const profileReducer = (state,action) => {
    state = state || initialProfile;
    switch (action.type) {
        case PROFILE_ACTION.SET:
            return { 
                email: action.payload.email,
                lastName: action.payload.familyName,
                firstName: action.payload.givenName,
                googleId: action.payload.googleId,
                imageUrl: action.payload.imageUrl,
                name: action.payload.name,
            }
        case PROFILE_ACTION.RESET:
            return { ...initialProfile }
        default:
            return state
    }
};

export default profileReducer;