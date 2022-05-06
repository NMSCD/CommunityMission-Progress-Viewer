import React, { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Flex, Box } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

import { addDays, dateIsBefore, formatDate } from '../../helper/dateHelper';
import { ProgressChart } from '../chart/progress/progressChart';
import { PercentageChart } from '../chart/percentageChange/percentageChart';

export const ChartSection: React.FC = () => {
    const [startDate, setStartDate] = useState<string>(formatDate(addDays(new Date(), -7), 'YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(formatDate(new Date(), 'YYYY-MM-DD'));
    const [chartSelected, setChartSelected] = useState<string>('0');

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

    const renderChart = (chartSelectedIndex: string) => {
        switch (chartSelectedIndex) {
            case '0':
                return (
                    <ProgressChart
                        startDate={startDate.toString()}
                        endDate={endDate.toString()}
                        hasErrors={[
                            ...startDateErrors,
                            ...endDateErrors
                        ].length > 0}
                    />
                );
            case '1':
                return (
                    <PercentageChart
                        startDate={startDate.toString()}
                        endDate={endDate.toString()}
                        hasErrors={[
                            ...startDateErrors,
                            ...endDateErrors
                        ].length > 0}
                    />
                );
        }
        return (<span>Something went wrong</span>)
    }

    return (
        <section id="chart" className="main special" style={{ paddingTop: '3em' }}>
            <div className="content noselect">
                <Flex>
                    <FormControl flex="1">
                        <FormLabel htmlFor='chartSelector'>Chart Type</FormLabel>
                        <select id='chartSelector' className="mb2" onChange={(e: any) => setChartSelected(e.target.value)}>
                            <option value="0">Progress per hour</option>
                            <option value="1">Percentage change per day</option>
                        </select>
                    </FormControl>
                    <Box w="25px"></Box>
                    <FormControl flex="1">
                    </FormControl>
                </Flex>
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
                {renderChart(chartSelected)}
            </div>
        </section>
    );
}
