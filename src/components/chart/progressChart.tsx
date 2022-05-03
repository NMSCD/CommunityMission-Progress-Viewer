import React from 'react';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ComposedChart, Area, Bar } from 'recharts';

import { CommunityMissionTrackedViewModel } from '../../constants/generated/Model/communityMissionTrackedViewModel';
import { formatDate } from '../../helper/dateHelper';
import { ProgressChartTooltip } from './progressChartTooltip';

interface IProps {
    data: Array<CommunityMissionTrackedViewModel>;
}

export const ProgressChart: React.FC<IProps> = React.memo((props: IProps) => {
    console.log("renderingChart");

    const colours = [
        '00405c',
        '006588',
        '008da3',
        '00b5a6',
        '00db91',
        '0dff64',
    ];

    const groups = (props.data ?? []).reduce((groups: any, item) => ({
        ...groups,
        [item.hourSinceEpochInterval]: [...(groups[item.hourSinceEpochInterval] || []), item]
    }), {});

    const allHoursSinceEpoch = props.data.map(d => d.hourSinceEpochInterval);
    const minHoursSinceEpoch = Math.min(...allHoursSinceEpoch);
    const maxHoursSinceEpoch = Math.max(...allHoursSinceEpoch);
    const numIterations = (maxHoursSinceEpoch - minHoursSinceEpoch);
    const timeSeriesList: Array<CommunityMissionTrackedViewModel> = [];
    for (let iteration = 0; iteration < numIterations; iteration++) {
        const hourToSearchFor = iteration + minHoursSinceEpoch;

        if (hourToSearchFor in groups) {
            const groupsData: Array<CommunityMissionTrackedViewModel> = groups[hourToSearchFor];
            const minData: CommunityMissionTrackedViewModel = groupsData.reduce((min, tracked) =>
                min.dateRecorded < tracked.dateRecorded ? min : tracked
            );
            (minData as any).spaces = 0;
            (minData as any).dateRecordedHour = formatDate(minData.dateRecorded, 'MM/DD');
            (minData as any).dateRecordedFriendly = formatDate(minData.dateRecorded, 'MM/DD HH:00');
            timeSeriesList.push(minData);
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

    if (sortedData.length < 1) {
        return (<span></span>);
    }

    const dataSetsToMap: Array<any> = [];
    for (const fData of sortedData) {
        const key = `${fData.missionId}:${fData.tier}`;
        if (fData.missionId == 0 || fData.tier == 0) continue;
        if (dataSetsToMap.map(dstm => dstm.key).includes(key)) continue;

        dataSetsToMap.push({
            key,
            name: `Mission ${fData.missionId} (Tier ${fData.tier})`,
        })
    }

    const dataWithMultiplDataSetMappings: Array<CommunityMissionTrackedViewModel> = [];
    for (let sortedDataItemIndex = 0; sortedDataItemIndex < sortedData.length; sortedDataItemIndex++) {
        const filteredDataItem = sortedData[sortedDataItemIndex];
        const newObj: any = { ...filteredDataItem };
        for (const dataSetToMap of dataSetsToMap) {
            const keys = dataSetToMap.key.split(':');
            if (filteredDataItem.missionId.toString() != keys[0] || filteredDataItem.tier.toString() != keys[1]) {
                // newObj[dataSetToMap.key] = 0;
            }
            else {
                if (newObj.percentage > 0 && newObj.percentage < 100) {
                    newObj[dataSetToMap.key] = newObj.percentage;
                }
            }
        }
        dataWithMultiplDataSetMappings.push({ ...newObj });
    }

    return (
        <ResponsiveContainer width="100%" height={600} className="progress-timeline">
            <ComposedChart
                width={800}
                height={600}
                data={dataWithMultiplDataSetMappings}
            >
                <XAxis xAxisId="0" dataKey="dateRecordedHour" />
                <XAxis xAxisId="1" dataKey="dateRecordedHour" allowDuplicatedCategory={false} />
                <YAxis />
                <Legend />
                <Tooltip content={<ProgressChartTooltip />} />
                <Line
                    type="monotone"
                    dataKey="spaces"
                    stroke="rgba(0,0,0,0)"
                    dot={<span></span>}
                />
                {
                    dataSetsToMap.map((dataSetToMap, idx) => {
                        const chartColour = '#' + colours[idx % colours.length];
                        return (
                            <Area
                                key={dataSetToMap.key}
                                type="monotone"
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
    );
}, (prevProps: any, nextProps: any) => {
    return prevProps.data.length === nextProps.data.length
});
