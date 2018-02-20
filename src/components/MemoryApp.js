import React from 'react';

import MemoryHeader from './MemoryHeader';
import MemoryGrid from './MemoryGrid';
import Timer from './Timer';

const MemoryApp = () => (
    <div>
        <MemoryHeader />
        <MemoryGrid />
        <Timer />
    </div>
);

export default MemoryApp;
