import { GET_USER, LOGOUT_USER } from '../constants/actionTypes';

const reducer = (user = null, action) => {
    switch(action.type) {
        case GET_USER:
            return action.payload;
        case LOGOUT_USER:
            return null;
        default:
            return user;
    }
}

export default reducer;