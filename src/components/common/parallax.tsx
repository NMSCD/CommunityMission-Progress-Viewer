import React from 'react';

export const TimeLoopParallax: React.FC = () => {
    return (
        <img
            data-0="transform:rotate(0deg);left:-300px;"
            data-750="transform:rotate(15deg);left:-100px;"
            data-1500="left:-100px;"
            data-3000="transform:rotate(0deg);left:-300px;"
            src="./assets/img/quicksilver.png"
            className="parallax-qs-merchant hidden-in-mobile noselect"
            alt="image with parallax"
        />
    );
}