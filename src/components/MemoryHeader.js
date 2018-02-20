import React, { Component } from 'react';

import Controls from './Controls';

class MemoryHeader extends Component {
    state = {}

    render() {
        return (
            <header>
                <h1>Memory Game</h1>
                <Controls />
            </header>
        );
    }
}

export default MemoryHeader;
