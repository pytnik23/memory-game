import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatTime } from '../utils';

import './Timer.css';

const Timer = ({ time }) => (
    <div className="timer">
        {time}
    </div>
);

Timer.propTypes = {
    time: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    time: formatTime(state.getIn(['game', 'time'])),
});

export default connect(mapStateToProps)(Timer);
