import { combineReducers } from 'redux-immutable';

import tiles from './tiles';
import game from './game';

const rootReducer = combineReducers({ tiles, game });

export default rootReducer;
