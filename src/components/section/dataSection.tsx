import React, { useEffect, useState } from 'react';
import { CommunityMissionViewModel } from '../../constants/generated/Model/communityMissionViewModel';
import { NetworkState } from '../../contracts/enum/NetworkState';
import { anyObject } from '../../helper/typescriptHacks';
import { CommunityMissionService } from '../../services/api/communityMissionService';
import { AssistantNmsApiLink, AssistantNmsWebLink, GalacticAtlasWebLink } from '../core/link';
import { DataSectionStat } from './dataSection/dataSectionStat';

export const DataSection: React.FC = () => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [data, setData] = useState<CommunityMissionViewModel>(anyObject);

    const getCurrentData = async () => {
        const service = new CommunityMissionService();
        const apiData = await service.getCommunityMission();
        if (apiData.isSuccess == false) {
            setNetworkState(NetworkState.Failed);
            return;
        }

        setData(apiData.value);
        setNetworkState(NetworkState.Success);
    }

    useEffect(() => {
        setNetworkState(NetworkState.Loading);
        getCurrentData();
    }, []);

    const firstHourSinceEpoch = 282300;
    const currentHourSinceEpoch = Math.floor((new Date()).getTime() / 1000 / 60 / 60);

    const hoursSinceStartedRecording = currentHourSinceEpoch - firstHourSinceEpoch;

    let missionTierDisplay = '? / ??';
    if (networkState == NetworkState.Loading) missionTierDisplay = '...';
    if (networkState == NetworkState.Success) missionTierDisplay = `${data.currentTier} / ${data.totalTiers}`;
    const missionPercentDisplay = data.percentage ?? 0;

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
                    iconClass="icon-notebook-list"
                    description="Started recording"
                    value={0}
                    displayValue={'2022-03-16'}
                    animate={false}
                />
                <DataSectionStat
                    style="style2"
                    iconClass="icon-database"
                    description="Number of records"
                    value={(hoursSinceStartedRecording * 12)}
                    displayValueFunc={(val) => val.toLocaleString()}
                />
                <DataSectionStat
                    style="style3"
                    iconClass="icon-database"
                    description="Current Mission Tier"
                    value={data?.currentTier ?? 0}
                    displayValue={missionTierDisplay}
                    animate={false}
                />
                <DataSectionStat
                    style="style5"
                    iconClass="icon-database"
                    description="Current Mission progress"
                    value={missionPercentDisplay}
                    displayValue={`${missionPercentDisplay.toString()} %`}
                />
            </ul>
            <p className="content">The <AssistantNmsWebLink /> apps have a service that runs 24/7 and requests the status from the <GalacticAtlasWebLink />. This data is then stored both a database and within a Redis cache. This data is served to anyone who requests it from the <AssistantNmsApiLink />. This means that a request for the Community Mission progress through the <AssistantNmsApiLink /> never makes a request to HelloGames servers as the data is already sitting in the database or Redis cache. If the <AssistantNmsApiLink /> is being attacked through a DDOS attack, HelloGames will not be affected. We would never want to put strain on the HelloGames servers🔥</p>
        </section>
    );
}
