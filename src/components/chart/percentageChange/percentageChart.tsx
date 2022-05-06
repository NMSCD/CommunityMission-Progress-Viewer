import React, { useEffect, useState } from 'react';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ComposedChart, Area, Bar, BarChart } from 'recharts';
import { progressChartColours } from '../../../constants/chartColours';
import { CommunityMissionPercentagePerDay } from '../../../constants/generated/Model/communityMissionPercentagePerDayViewModel';

import { CommunityMissionTrackedViewModel } from '../../../constants/generated/Model/communityMissionTrackedViewModel';
import { NetworkState } from '../../../contracts/enum/NetworkState';
import { formatDate } from '../../../helper/dateHelper';
import { CommunityMissionService } from '../../../services/api/communityMissionService';

interface IProps {
    hasErrors: boolean;
    startDate: string;
    endDate: string;
}

export const PercentageChart: React.FC<IProps> = React.memo((props: IProps) => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [data, setData] = useState<Array<CommunityMissionPercentagePerDay>>([]);

    useEffect(() => {
        if (props.hasErrors) return;
        getTrackedData(props.startDate, props.endDate);
    }, [props.startDate, props.endDate]);

    const getTrackedData = async (startDateParam: string, endDateParam: string) => {
        setNetworkState(NetworkState.Loading);
        const service = new CommunityMissionService();
        const apiData = await service.getPercentageChangePerDay(startDateParam, endDateParam);
        if (apiData.isSuccess == false) {
            setNetworkState(NetworkState.Failed);
            return;
        }

        setData(apiData.value);
        setNetworkState(NetworkState.Success);
    }

    const getSortedData = (localData: Array<CommunityMissionPercentagePerDay>): Array<CommunityMissionPercentagePerDay> => {
        try {
            const groups = (localData ?? []).reduce((groups: any, item) => ({
                ...groups,
                [item.daySinceEpochInterval]: [...(groups[item.daySinceEpochInterval] || []), item]
            }), {});

            const allSinceEpoch = localData.map(d => d.daySinceEpochInterval);
            const minSinceEpoch = Math.min(...allSinceEpoch);
            const maxSinceEpoch = Math.max(...allSinceEpoch);
            const numIterations = (maxSinceEpoch - minSinceEpoch);
            const timeSeriesList: Array<CommunityMissionPercentagePerDay> = [];
            for (let iteration = 0; iteration < numIterations; iteration++) {
                const keyToSearchFor = iteration + minSinceEpoch;

                if (keyToSearchFor in groups) {
                    const groupsData: Array<CommunityMissionPercentagePerDay> = groups[keyToSearchFor];
                    if (groupsData.length < 1) continue;

                    const firstItem: CommunityMissionPercentagePerDay = groupsData[0];
                    const itemDate = new Date(firstItem.daySinceEpochInterval * 86400000);
                    (firstItem as any).spaces = 0;
                    (firstItem as any).dateRecordedHour = formatDate(itemDate, 'YYYY/MM/DD');
                    timeSeriesList.push(firstItem);
                } else {
                    timeSeriesList.push({
                        daySinceEpochInterval: keyToSearchFor,
                        percentage: 0,
                    } as any);
                }
            }

            const sortedData = timeSeriesList.sort((a, b) => (a.daySinceEpochInterval > b.daySinceEpochInterval) ? 1 : -1);
            return sortedData;
        } catch {
            return [];
        }
    }

    let hasError: boolean = false;
    let sortedData: Array<CommunityMissionPercentagePerDay> = [];
    if (networkState !== NetworkState.Loading) {
        sortedData = getSortedData(data);
        if (sortedData.length < 1) {
            hasError = true;
        }
    }

    return (
        <>
            {
                networkState === NetworkState.Success &&
                <ResponsiveContainer width="100%" height={600} className="progress-timeline">
                    <BarChart
                        width={800}
                        height={600}
                        data={sortedData}
                    >
                        <XAxis xAxisId="0" dataKey="dateRecordedHour" />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <Bar
                            type="monotone"
                            dataKey="percentage"
                            name="Percentage change"
                            unit=" %"
                            fill={progressChartColours[0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            }
            {
                networkState === NetworkState.Loading &&
                <div className="chart-loading">
                    <img src="./assets/img/loader.svg" alt="loading" />
                </div>
            }
            {
                (hasError || data.length < 1 && networkState !== NetworkState.Loading) &&
                <>
                    <br />
                    <h2 className="chart-loading-text">Failed to fetch data</h2>
                </>
            }
        </>
    );
}, (prevProps: IProps, nextProps: IProps) => {
    const hasNotChanged =
        prevProps.startDate === nextProps.startDate &&
        prevProps.endDate === nextProps.endDate;
    return hasNotChanged
});
