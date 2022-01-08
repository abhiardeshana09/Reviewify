import { LOAD_ALBUM, UNLOAD_ALBUM, CREATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';

const reducer = (album = null, action) => {
    switch(action.type) {
        case LOAD_ALBUM:
            return action.payload;
        case UNLOAD_ALBUM:
            return null;
        case CREATE_REVIEW:
        case DELETE_REVIEW:
            return action.payload.updatedAlbum;
        default:
            return album;
    }
}

export default reducer;