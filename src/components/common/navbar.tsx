import React from 'react';

export const Navbar: React.FC = () => {
    return (
        <nav id="nav" className="noselect">
            <ul>
                <li><a href="#intro" className="active">Introduction</a></li>
                <li><a href="#chart">Interactive Chart</a></li>
                <li><a href="#data-source">Data source</a></li>
                <li><a href="#footer">About</a></li>
            </ul>
        </nav>
    );
}