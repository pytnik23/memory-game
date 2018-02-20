import { List } from 'immutable';

import { SET_TILES, FLIP_TILE } from '../actions';

export default (state = List(), action) => {
    switch (action.type) {
        case SET_TILES:
            return action.tiles;
        case FLIP_TILE:
            return state.map(tile => (
                (tile.get('id') === action.id)
                ? tile.set('isFlipped', !tile.get('isFlipped'))
                : tile
            ));
        default:
            return state;
    }
};
