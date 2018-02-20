import { getTiles, getSeconsFromNow } from '../utils';

export const SET_TILES = 'SET_TILES';
export const FLIP_TILE = 'FLIP_TILE';
export const SET_GAME_STATUS = 'SET_GAME_STATUS';
export const SET_GAME_SIZE = 'SET_GAME_SIZE';
export const SET_TIME = 'SET_TIME';
export const SET_COUNT = 'SET_COUNT';

let timer;

export const setGameSize = size => ({
    type: SET_GAME_SIZE,
    size,
});

export const setTiles = size => ({
    type: SET_TILES,
    tiles: getTiles(size),
});

export const flipTile = id => ({
    type: FLIP_TILE,
    id,
});

export const setGameStatus = status => ({
    type: SET_GAME_STATUS,
    status,
});

export const setTime = time => ({
    type: SET_TIME,
    time,
});

export const setCount = count => ({
    type: SET_COUNT,
    count,
});

let prevId;
let prevPairId;

const resetIds = () => {
    prevId = undefined;
    prevPairId = undefined;
};

export const onTileClick = e => (dispatch, getState) => {
    const id = +e.target.dataset.id;
    const pairId = +e.target.dataset.pairId;

    if (prevId !== undefined) {
        if (prevPairId === pairId) {
            const count = getState().getIn(['game', 'count']) + 1;
            const gameSize = getState().getIn(['game', 'size']);

            dispatch(flipTile(id));
            dispatch(setCount(count));
            resetIds();

            if (count === (gameSize * gameSize) / 2) {
                clearInterval(timer);
                dispatch(setGameStatus('finished'));
            }
        } else {
            dispatch(flipTile(id));
            setTimeout(() => {
                dispatch(flipTile(id));
                dispatch(flipTile(prevId));
                resetIds();
            }, 500);
        }
    } else {
        dispatch(flipTile(id));
        prevId = id;
        prevPairId = pairId;
    }
};

export const startTimer = () => (dispatch, getState) => {
    const time = getState().getIn(['game', 'time']);
    const startTime = getSeconsFromNow(time);

    timer = setInterval(() => {
        dispatch(setTime(getSeconsFromNow(startTime)));
    }, 1000);
};

export const changeGameOption = size => (dispatch) => {
    dispatch(setGameSize(size));
    dispatch(setTiles(size));
};

export const initGame = size => (dispatch) => {
    dispatch(setGameStatus('init'));
    dispatch(changeGameOption(size));
};

export const startGame = () => (dispatch) => {
    dispatch(startTimer());
    dispatch(setGameStatus('running'));
};

export const pauseGame = () => (dispatch) => {
    clearInterval(timer);
    dispatch(setGameStatus('paused'));
};

export const continueGame = () => (dispatch) => {
    dispatch(startTimer());
    dispatch(setGameStatus('running'));
};

export const stopGame = () => (dispatch, getState) => {
    clearInterval(timer);
    const gameSize = getState().getIn(['game', 'size']);
    dispatch(initGame(gameSize));
    dispatch(setTime(0));
    dispatch(setCount(0));
    resetIds();
};
