import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Flex, Box } from '@chakra-ui/react'

import { CommunityMissionTrackedViewModel } from '../../constants/generated/Model/communityMissionTrackedViewModel';
import { addDays, dateIsBefore, formatDate } from '../../helper/dateHelper';
import { CommunityMissionService } from '../../services/api/communityMissionService';
import { ProgressChart } from '../chart/progressChart';
import { NetworkState } from '../../contracts/enum/NetworkState';

export const ChartSection: React.FC = () => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [data, setData] = useState<Array<CommunityMissionTrackedViewModel>>([]);
    const [startDate, setStartDate] = useState<string>(formatDate(addDays(new Date(), -7), 'YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(formatDate(new Date(), 'YYYY-MM-DD'));

    const getTrackedData = async (startDateParam: string, endDateParam: string) => {
        const errors = [
            ...getCommonDateErrors(startDateParam),
            ...getStartDateErrors(startDateParam, endDateParam),
            ...getCommonDateErrors(endDateParam)
        ];
        if (errors.length > 0) return;

        setNetworkState(NetworkState.Loading);
        const service = new CommunityMissionService();
        const apiData = await service.getCommunityMissionTrackedProgress(startDateParam, endDateParam);
        if (apiData.isSuccess == false) {
            setNetworkState(NetworkState.Failed);
            return;
        }

        setData(apiData.value);
        setNetworkState(NetworkState.Success);
    }

    useEffect(() => {
        getTrackedData(startDate, endDate);
    }, [startDate, endDate]);

    const getCommonDateErrors = (dateParam: string): Array<string> => {
        const errors: Array<string> = [];
        const dateObj = new Date(dateParam);
        if (dateIsBefore(dateObj, new Date('2022-03-16'))) {
            errors.push('The data only goes as far back as the 16th of March 2022');
        }
        return errors;
    };
    const getStartDateErrors = (startDateParam: string, endDateParam: string): Array<string> => {
        const errors: Array<string> = getCommonDateErrors(startDateParam);
        const startDateObj = new Date(startDateParam);
        const endDateObj = new Date(endDateParam);
        if (dateIsBefore(endDateObj, startDateObj)) {
            errors.push('Start date cannot be before the end date');
        }
        if (dateIsBefore(addDays(new Date(), 1), startDateObj)) {
            errors.push('Selected date cannot be in the future');
        }
        return errors;
    };
    const getEndDateErrors = (startDateParam: string, endDateParam: string): Array<string> => {
        const errors: Array<string> = getCommonDateErrors(endDateParam);
        return errors;
    };

    const startDateErrors = getStartDateErrors(startDate, endDate);
    const endDateErrors = getEndDateErrors(startDate, endDate);

    const renderErrors = (errorMsgs: Array<string>) => (<>{
        errorMsgs.map(errorMsg => (
            <FormErrorMessage key={errorMsg}>
                {errorMsg}
            </FormErrorMessage>
        ))
    }</>);

    return (
        <section id="chart" className="main special">
            <div className="content noselect">
                <Flex>
                    <FormControl flex="1" isInvalid={startDateErrors.length > 0}>
                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                        <Input
                            id='startDate'
                            type='date'
                            value={startDate.toString()}
                            onChange={(e: any) => setStartDate(e.target.value)}
                        />
                        {renderErrors(startDateErrors)}
                    </FormControl>
                    <Box w="25px"></Box>
                    <FormControl flex="1" isInvalid={endDateErrors.length > 0}>
                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                        <Input
                            id='endDate'
                            type='date'
                            value={endDate.toString()}
                            onChange={(e: any) => setEndDate(e.target.value)}
                        />
                        {renderErrors(endDateErrors)}
                    </FormControl>
                </Flex>
            </div>
            <div className="content chart-section noselect" style={{ marginTop: '2em' }}>
                <ProgressChart data={data} />
                {
                    networkState === NetworkState.Loading &&
                    <div className="chart-loading">
                        <img src="./assets/img/loader.svg" alt="loading" />
                    </div>
                }
                {
                    (data.length < 1 && networkState !== NetworkState.Loading) &&
                    <>
                        <br />
                        <h2 className="chart-loading-text">Failed to fetch data</h2>
                    </>
                }
            </div>
        </section>
    );
}
