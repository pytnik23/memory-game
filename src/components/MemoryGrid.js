import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { onTileClick } from '../actions';

import MemoryItem from './MemoryItem';

import './MemoryGrid.css';

const MemoryGrid = ({
    tiles,
    status,
    onTileClick,
}) => (
    <div className="wrapper">
        <ul className="tiles">
            {
                tiles.map(tile => (
                    <MemoryItem
                        key={tile.get('id')}
                        id={tile.get('id')}
                        pairId={tile.get('pairId')}
                        image={tile.get('image')}
                        isFlipped={tile.get('isFlipped')}
                        onClick={onTileClick}
                    />
                ))
            }
        </ul>
        <div className={`overlay ${status === 'running' ? 'overlay__hidden' : ''}`}>
            <span>
                { status === 'init' && 'Press Start' }
                { status === 'paused' && 'Paused' }
                { status === 'finished' && 'Finish!' }
            </span>
        </div>
    </div>
);

MemoryGrid.propTypes = {
    tiles: ImmutablePropTypes.list.isRequired,
    status: PropTypes.string.isRequired,
    onTileClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    tiles: state.get('tiles'),
    status: state.getIn(['game', 'status']),
});

export default connect(mapStateToProps, { onTileClick })(MemoryGrid);
