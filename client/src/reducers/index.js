import { combineReducers } from 'redux';

import user from './user';
import album from './album';
import reviews from './reviews';

export default combineReducers({ user, album, reviews });