import React from 'react';
import { Site } from '../../constants/site';

export const Header: React.FC = () => {
    return (
        <header id="header" className="noselect alt">
            <span className="logo">
                <div className="images">
                    <img src="/assets/img/logoBg.png" className="logo-bg" alt="site logo" />
                    <img src="/assets/img/logo.png" className="logo-fade" alt="site logo" />
                </div>
            </span>
            <h1>Community Mission Viewer</h1>
            <p>Just another free <a href={Site.nms.home}>NMS</a> tool, <br />
                built by <a href={Site.assistantNMS.website}>Assistant for No Man's Sky</a>.</p>
        </header>
    );
}


