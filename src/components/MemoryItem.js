import React from 'react';
import PropTypes from 'prop-types';

const MemoryItem = ({
    id,
    pairId,
    image,
    isFlipped,
    onClick,
}) => (
    <li className={`tiles__item ${isFlipped ? 'tiles__item_flipped' : ''}`}>
        <img className="tiles__image" src={image} alt="tile" />
        <button
            className="tiles__button"
            type="button"
            data-id={id}
            data-pair-id={pairId}
            onClick={onClick}
        >
            {' '}
        </button>
    </li>
);

MemoryItem.defaultProps = {
    image: '',
};

MemoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    pairId: PropTypes.number.isRequired,
    image: PropTypes.string,
    isFlipped: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MemoryItem;
