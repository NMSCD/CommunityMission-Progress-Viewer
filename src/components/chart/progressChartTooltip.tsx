import React, { ReactNode } from 'react';

interface IProps {
    label: string;
    payload: Array<any>
}

export const ProgressChartTooltip: React.FC<IProps | any> = (props: IProps | any) => {
    const hasPayloads = props.payload && props.payload.length > 1;
    if (!hasPayloads) {
        return (<></>);
    }

    const percentagePayload = props.payload[0];
    const datePayload = props.payload[1];

    const name = (hasPayloads && datePayload.name) ? datePayload.name : null;
    const percentage = (hasPayloads && percentagePayload.payload) ? percentagePayload.payload.percentage : null;
    const dateRecordedFriendly = (hasPayloads && datePayload.payload) ? datePayload.payload.dateRecordedFriendly : null;

    const listItems: Array<ReactNode> = [];
    if (name != null) listItems.push(
        <li key={'name: ' + name}>
            <span><b>{name}</b></span>
        </li>
    );
    if (percentage != null) listItems.push(
        <li key={'percentage: ' + percentage}>
            <span><b>Percentage:</b>&nbsp;{percentage} %</span>
        </li>
    );
    if (dateRecordedFriendly != null) listItems.push(
        <li key={'date: ' + dateRecordedFriendly}>
            <span ><b>Date:</b>&nbsp;{dateRecordedFriendly}</span>
        </li>
    );

    return (
        <div style={{ backgroundColor: '#F0F0F0', padding: '1em', borderRadius: '5px', border: '1px solid greyI', textAlign: 'center' }}>
            <ul>
                {listItems.map(listItem => (listItem))}
            </ul>
        </div>
    );
}