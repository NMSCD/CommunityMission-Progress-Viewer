import React, { useEffect, useState } from 'react';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ComposedChart, Area, Bar } from 'recharts';
import { progressChartColours } from '../../../constants/chartColours';

import { CommunityMissionTrackedViewModel } from '../../../constants/generated/Model/communityMissionTrackedViewModel';
import { NetworkState } from '../../../contracts/enum/NetworkState';
import { formatDate } from '../../../helper/dateHelper';
import { CommunityMissionService } from '../../../services/api/communityMissionService';
import { ProgressChartTooltip } from './progressChartTooltip';

interface IProps {
    hasErrors: boolean;
    startDate: string;
    endDate: string;
    dataDecreaseRate: number;
}

export const ProgressChart: React.FC<IProps> = React.memo((props: IProps) => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [missionAndTier, setMissionAndTier] = useState<string>();
    const [data, setData] = useState<Array<CommunityMissionTrackedViewModel>>([]);

    useEffect(() => {
        if (props.hasErrors) return;
        getTrackedData(props.startDate, props.endDate);
    }, [props.startDate, props.endDate]);

    const getTrackedData = async (startDateParam: string, endDateParam: string, missionIdParam?: number, missionTierParam?: number) => {
        setNetworkState(NetworkState.Loading);
        const service = new CommunityMissionService();
        const apiData = await service.getCommunityMissionTrackedProgress(startDateParam, endDateParam, missionIdParam, missionTierParam);
        if (apiData.isSuccess == false) {
            setNetworkState(NetworkState.Failed);
            return;
        }

        setData(apiData.value);
        setNetworkState(NetworkState.Success);
    }

    const getSortedData = (localData: Array<CommunityMissionTrackedViewModel>): Array<CommunityMissionTrackedViewModel> => {
        try {
            const groups = (localData ?? []).reduce((groups: any, item) => ({
                ...groups,
                [item.hourSinceEpochInterval]: [...(groups[item.hourSinceEpochInterval] || []), item]
            }), {});

            const allHoursSinceEpoch = localData.map(d => d.hourSinceEpochInterval);
            const minHoursSinceEpoch = Math.min(...allHoursSinceEpoch);
            const maxHoursSinceEpoch = Math.max(...allHoursSinceEpoch);
            const numIterations = (maxHoursSinceEpoch - minHoursSinceEpoch);
            const timeSeriesList: Array<CommunityMissionTrackedViewModel> = [];
            for (let iteration = 0; iteration < numIterations; iteration++) {
                const hourToSearchFor = iteration + minHoursSinceEpoch;
                if (iteration % props.dataDecreaseRate) continue;

                if (hourToSearchFor in groups) {
                    const groupsData: Array<CommunityMissionTrackedViewModel> = groups[hourToSearchFor];
                    if (groupsData.length < 1) continue;

                    const firstItem: CommunityMissionTrackedViewModel = groupsData[0];

                    (firstItem as any).spaces = 0;
                    (firstItem as any).dateRecordedHour = formatDate(firstItem.dateRecorded.toLocaleString(), 'MM/DD');
                    (firstItem as any).dateRecordedFriendly = formatDate(firstItem.dateRecorded.toLocaleString(), 'MM/DD HH:00');
                    timeSeriesList.push(firstItem);
                } else {
                    timeSeriesList.push({
                        dateRecorded: null,
                        hourSinceEpochInterval: hourToSearchFor,
                        minuteSinceEpochInterval: hourToSearchFor * 60,
                        missionId: 0,
                        percentage: 0,
                        spaces: 0,
                        tier: 0,
                    } as any);
                }
            }

            const sortedData = timeSeriesList.sort((a, b) => (a.hourSinceEpochInterval > b.hourSinceEpochInterval) ? 1 : -1);
            return sortedData;
        } catch {
            return [];
        }
    }

    const handleData = (sortedData: Array<CommunityMissionTrackedViewModel>, dataSetsToMap: Array<any>): Array<CommunityMissionTrackedViewModel> => {
        const maxPercentLookup: any = {};
        try {
            const dataWithMultiplDataSetMappings: Array<CommunityMissionTrackedViewModel> = [];
            for (let sortedDataItemIndex = 0; sortedDataItemIndex < sortedData.length; sortedDataItemIndex++) {
                const filteredDataItem = sortedData[sortedDataItemIndex];
                const newObj: any = { ...filteredDataItem };
                for (const dataSetToMap of dataSetsToMap) {
                    const keys = dataSetToMap.key.split(':');
                    if (missionAndTier != null && dataSetToMap.key != missionAndTier) continue;

                    if (filteredDataItem.missionId.toString() != keys[0] || filteredDataItem.tier.toString() != keys[1]) {
                        // newObj[dataSetToMap.key] = 0;
                    }
                    else {
                        if (newObj.percentage > 0) {
                            if (newObj.percentage >= 100) {
                                if (maxPercentLookup[newObj.missionId]) {
                                    continue;
                                }
                                maxPercentLookup[newObj.missionId] = true;
                            }
                            newObj[dataSetToMap.key] = newObj.percentage;
                        }
                    }
                }
                dataWithMultiplDataSetMappings.push({ ...newObj });
            }

            return dataWithMultiplDataSetMappings;
        } catch {
            return [];
        }

    }

    const onAreaChartClicked = (localMissionAndTier: string | undefined) => (chartObj: any) => {
        if (localMissionAndTier != null) {
            setMissionAndTier(undefined);
            return;
        }

        let selectedData;
        for (const activePay of chartObj.activePayload) {
            if (activePay.value != null && activePay.value > 0) {
                selectedData = activePay.payload;
                break;
            }
        }
        if (selectedData == null) return;

        const missionId = selectedData?.missionId;
        if (missionId == null) return;
        const missionTier = selectedData?.tier;
        if (missionTier == null) return;

        setMissionAndTier(`${missionId}:${missionTier}`);
    }

    let hasError: boolean = false;
    const dataSetsToMap: Array<any> = [];
    let dataWithMultiplDataSetMappings: Array<CommunityMissionTrackedViewModel> = [];

    if (networkState !== NetworkState.Loading) {
        const sortedData = getSortedData(data);
        if (sortedData.length < 1) {
            hasError = true;
        }

        for (const fData of sortedData) {
            const key = `${fData.missionId}:${fData.tier}`;
            if (fData.missionId == 0 || fData.tier == 0) continue;
            if (dataSetsToMap.map(dstm => dstm.key).includes(key)) continue;

            dataSetsToMap.push({
                key,
                name: `Mission ${fData.missionId} (Tier ${fData.tier})`,
            })
        }

        dataWithMultiplDataSetMappings = handleData(sortedData, dataSetsToMap);
        if (dataWithMultiplDataSetMappings.length < 1) {
            hasError = true;
        }
    }

    return (
        <>
            {
                networkState === NetworkState.Success &&
                <ResponsiveContainer width="100%" height={600} className="progress-timeline hide-first-xaxis mt1">
                    <ComposedChart
                        width={800}
                        height={600}
                        data={dataWithMultiplDataSetMappings}
                        onClick={onAreaChartClicked(missionAndTier)}
                    >
                        <XAxis xAxisId="0" dataKey="dateRecordedHour" />
                        <XAxis xAxisId="1" dataKey="dateRecordedHour" allowDuplicatedCategory={false} />
                        <YAxis />
                        <Legend />
                        <Tooltip content={<ProgressChartTooltip />} />
                        <Line
                            type="natural"
                            dataKey="spaces"
                            stroke="rgba(0,0,0,0)"
                            dot={<span></span>}
                        />
                        {
                            dataSetsToMap.map((dataSetToMap, idx) => {
                                const chartColour = progressChartColours[idx % progressChartColours.length];
                                return (
                                    <Area
                                        key={dataSetToMap.key}
                                        type="basis"
                                        connectNulls
                                        dataKey={dataSetToMap.key}
                                        strokeWidth={2}
                                        stroke={chartColour}
                                        fill={chartColour}
                                        name={dataSetToMap.name}
                                        dot={<span></span>}
                                    />
                                )
                            })
                        }
                    </ComposedChart>
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
