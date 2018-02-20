import { Map } from 'immutable';

import {
    SET_GAME_STATUS,
    SET_GAME_SIZE,
    SET_TIME,
    SET_COUNT,
} from '../actions';

export default (state = Map({
    status: 'init',
    time: 0,
    count: 0,
}), action) => {
    switch (action.type) {
        case SET_GAME_STATUS:
            return state.set('status', action.status);
        case SET_GAME_SIZE:
            return state.set('size', action.size);
        case SET_TIME:
            return state.set('time', action.time);
        case SET_COUNT:
            return state.set('count', action.count);
        default:
            return state;
    }
};
