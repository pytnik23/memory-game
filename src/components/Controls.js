import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeGrid } from '../utils';

import './Controls.css';

import {
    changeGameOption,
    initGame,
    startGame,
    pauseGame,
    continueGame,
    stopGame,
} from '../actions';

class Controls extends Component {
    state = {
        value: 4,
    };

    componentDidMount() {
        const { value } = this.state;
        this.props.initGame(value);
        changeGrid(value);
    }

    handleChange = (e) => {
        const value = +e.target.value;
        this.setState({ value });
        this.props.changeGameOption(value);
        changeGrid(value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startGame();
    }

    handlePauseClick = () => {
        this.props.pauseGame();
    }

    handleContinueClick = () => {
        this.props.continueGame();
    }

    handleStopClick = () => {
        this.props.stopGame();
    }

    render() {
        const { gameStatus } = this.props;

        return (
            <form
                className="controls"
                onSubmit={this.handleSubmit}
            >
                <label htmlFor="gameOption">
                    <span className="option-label">Choose an option</span>
                    <select
                        className="option-select"
                        value={this.state.value}
                        onChange={this.handleChange}
                        id="gameOption"
                        disabled={gameStatus !== 'init'}
                    >
                        <option value={4}>4x4</option>
                        <option value={6}>6x6</option>
                    </select>
                </label>
                <br />
                {gameStatus === 'init' &&
                    <button
                        className="button"
                        type="submit"
                    >
                        Start
                    </button>
                }
                {gameStatus === 'running' &&
                    <button
                        className="button"
                        type="button"
                        onClick={this.handlePauseClick}
                    >
                        Pause
                    </button>
                }
                {gameStatus === 'paused' &&
                    <button
                        className="button"
                        type="button"
                        onClick={this.handleContinueClick}
                    >
                        Continue
                    </button>
                }
                {gameStatus !== 'init' &&
                    <button
                        className="button"
                        type="button"
                        onClick={this.handleStopClick}
                    >
                        Reset
                    </button>
                }
            </form>
        );
    }
}

Controls.propTypes = {
    gameStatus: PropTypes.string.isRequired,
    changeGameOption: PropTypes.func.isRequired,
    initGame: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    pauseGame: PropTypes.func.isRequired,
    continueGame: PropTypes.func.isRequired,
    stopGame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    gameStatus: state.getIn(['game', 'status']),
});

export default connect(mapStateToProps, {
    changeGameOption,
    initGame,
    startGame,
    pauseGame,
    continueGame,
    stopGame,
})(Controls);
