import React from 'react';
import { AssistantNmsApiLink, AssistantNmsWebLink, GalacticAtlasWebLink } from '../core/link';
import { DataSectionStat } from './dataSection/dataSectionStat';

export const DataSection: React.FC = () => {
    const firstHourSinceEpoch = 282300;
    const currentHourSinceEpoch = Math.floor((new Date()).getTime() / 1000 / 60 / 60);

    const hoursSinceStartedRecording = currentHourSinceEpoch - firstHourSinceEpoch;

    return (
        <section id="data-source" className="main special">
            <header className="major">
                <h2>Where does the data come from?</h2>
                <p className="max-width-75">
                    We gently query the <GalacticAtlasWebLink /> every few minutes and
                    store the response in the <AssistantNmsWebLink /> database.
                </p>
            </header>
            <ul className="statistics">
                <DataSectionStat
                    style="style1"
                    description="Started recording"
                    value={0}
                    displayValue={'2022-03-16'}
                    animate={false}
                />
                <DataSectionStat
                    style="style2"
                    description="Number of records"
                    value={(hoursSinceStartedRecording * 12)}
                    displayValueFunc={(val) => val.toLocaleString()}
                />
                <li className="style3">
                    <span className="icon fa-gem"></span>
                    <strong>1,024</strong>Nullam
                </li>
                <li className="style5">
                    <span className="icon fa-gem"></span>
                    <strong>1,024</strong>Nullam
                </li>
            </ul>
            <p className="content">The <AssistantNmsWebLink /> apps have a service that runs 24/7 and requests the status from the <GalacticAtlasWebLink />. This data is then stored both a database and within a Redis cache. This data is served to anyone who requests it from the <AssistantNmsApiLink />. This means that a request for the Community Mission progress through the <AssistantNmsApiLink /> never makes a request to HelloGames servers as the data is already sitting in the database or Redis cache. If the <AssistantNmsApiLink /> is being attacked through a DDOS attack, HelloGames will not be affected. We would never want to put strain on the HelloGames servers🔥</p>
        </section>
    );
}
