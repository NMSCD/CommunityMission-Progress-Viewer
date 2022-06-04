import React, { useEffect, useState } from 'react';

import { addDays, dateIsBefore, formatDate } from '../../helper/dateHelper';
import { ProgressChart } from '../chart/progress/progressChart';
import { PercentageChart } from '../chart/percentageChange/percentageChart';
import { BasicImage } from '../core/image';
import { infoToast } from '../../helper/toastHelper';
import { Site } from '../../constants/site';

interface IProps {
    setIncidentsOpen: () => void;
}

export const ChartSection: React.FC<IProps> = (props: IProps) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const type = urlParams.get('type');
    const start = urlParams.get('start');
    const end = urlParams.get('end');

    const [startDate, setStartDate] = useState<string>(start ?? formatDate(addDays(new Date(), -7), 'YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(end ?? formatDate(new Date(), 'YYYY-MM-DD'));
    const [chartSelected, setChartSelected] = useState<string>(type ?? '0');

    useEffect(() => {
        const paramString = getUrlParamString();
        window.history.pushState({}, 'NMS Community Mission Progress', paramString);
    }, [
        startDate,
        endDate,
        chartSelected,
    ]);

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

    const getUrlParamString = () => {
        const params = [
            { name: 'type', value: chartSelected },
            { name: 'start', value: startDate.toString() },
            { name: 'end', value: endDate.toString() },
        ];
        const paramString = '?' + params.map(p => p.name + '=' + p.value).join('&');
        return paramString;
    }

    const copySelectedOptions = () => {
        const paramString = getUrlParamString();
        const fullLink = Site.url + paramString;
        navigator?.clipboard?.writeText?.(fullLink)?.then?.(() => {
            infoToast('Copied url');
        });
    }

    const resetOptions = () => {
        setStartDate(formatDate(addDays(new Date(), -7), 'YYYY-MM-DD'));
        setEndDate(formatDate(new Date(), 'YYYY-MM-DD'));
        setChartSelected('0');
    }

    const renderErrors = (errorMsgs: Array<string>) => (<>{
        errorMsgs.map(errorMsg => (
            <div key={errorMsg}>
                {errorMsg}
            </div>
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
                <div className="flex">
                    <div className="form-control">
                        <label htmlFor="chartSelector">Chart Type</label>
                        <select id="chartSelector" className="mb2"
                            value={chartSelected}
                            onChange={(e: any) => setChartSelected(e.target.value)}>
                            <option value="0">Progress per hour</option>
                            <option value="1">Percentage change per day</option>
                        </select>
                    </div>
                    <div style={{ width: '25px' }}></div>
                    <div className="form-control">
                        <label className="center">Options</label>
                        <span className="tool" data-tip="Reset all the options to default values">
                            <button className="share-btn" onClick={resetOptions}>
                                <BasicImage imageUrl="./assets/img/reset.svg" alt="reset" />
                            </button>
                        </span>
                        &nbsp;&nbsp;
                        <span className="tool" data-tip="Get a shareable link with all your settings included">
                            <button className="share-btn" onClick={copySelectedOptions}>
                                <BasicImage imageUrl="./assets/img/share.svg" alt="share" />
                            </button>
                        </span>
                        &nbsp;&nbsp;
                        <span className="tool" data-tip="Get a summary of past incidents or irregularities">
                            <button className="share-btn" onClick={() => props.setIncidentsOpen()}>
                                <BasicImage imageUrl="./assets/img/report.svg" alt="report" />
                            </button>
                        </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="form-control">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate.toString()}
                            onChange={(e: any) => setStartDate(e.target.value)}
                        />
                        {renderErrors(startDateErrors)}
                    </div>
                    <div style={{ width: '25px' }}></div>
                    <div className="form-control">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate.toString()}
                            onChange={(e: any) => setEndDate(e.target.value)}
                        />
                        {renderErrors(endDateErrors)}
                    </div>
                </div>
            </div>
            <div className="content chart-section noselect">
                {renderChart(chartSelected)}
            </div>
        </section>
    );
}
