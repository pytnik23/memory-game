import { fromJS } from 'immutable';

const getPairId = (id) => (
    (id % 2 === 0)
        ? id / 2
        : (id - 1) / 2
);

const shuffleTiles = tiles => {
    const shuffledTiles = tiles.slice();
    for (let i = 0; i < shuffledTiles.length; i++) {
        const currentTile = shuffledTiles[i];
        const randomIdx = Math.floor(Math.random() * shuffledTiles.length);
        shuffledTiles[i] = shuffledTiles[randomIdx];
        shuffledTiles[randomIdx] = currentTile;
    }
    return shuffledTiles;
};

export const getTiles = (count) => {
    const tiles = [];
    for (let i = 0; i < count * count; i++) {
        const pairId = getPairId(i);
        tiles.push({
            id: i,
            pairId,
            isFlipped: false,
            image: `https://loremflickr.com/320/320?lock=${pairId}`,
        });
    }
    return fromJS(shuffleTiles(tiles));
};

export const changeGrid = (value) => {
    const grid = document.querySelector('.tiles');
    let propValue;
    switch (value) {
        case 6:
            propValue = '16.6666%';
            break;
        case 5:
            propValue = '20%';
            break;
        case 4:
            propValue = '25%';
            break;
        default:
            propValue = '25%';
    }
    grid.style.setProperty('--tileWidth', propValue);
};

export const getSeconsFromNow = s => Math.floor((Date.now() - (s * 1000)) / 1000);

export const formatTime = s => {
    const addZero = n => (n < 10) ? `0${n}` : n;

    const hours = addZero(Math.floor((s / 3600) % 24));
    const minutes = addZero(Math.floor((s / 60) % 60));
    const seconds = addZero(Math.floor(s % 60));

    return `${hours}:${minutes}:${seconds}`;
};
