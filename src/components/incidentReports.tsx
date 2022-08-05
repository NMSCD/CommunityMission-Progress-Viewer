import React from 'react';
import { formatDate } from '../helper/dateHelper';
import { BasicLink } from './core/link';

interface IProps {
    isOpen: boolean;
    setIncidentsOpen: () => void;
}

export const IncidentReports: React.FC<IProps> = (props: IProps) => {

    const defaultDateTextFromUtc = (dateString: string) => formatDate((new Date(dateString)).toLocaleString(), 'YYYY-MM-DD HH:mm (Z)');
    const friendlyDateTextFromUtc = (dateString: string) => formatDate((new Date(dateString)).toLocaleString(), 'HH:mm on YYYY-MM-DD (Z)');

    return (
        <>
            <div className={'incidents-bg ' + (props.isOpen === true ? 'open' : 'closed')} onClick={props.setIncidentsOpen}></div>
            <div className={'incidents ' + (props.isOpen === true ? 'open' : 'closed')}>
                <button className="hidden-in-desktop mb2" style={{ width: '100%', backgroundColor: '#7d76e3' }} onClick={props.setIncidentsOpen}>
                    Close
                </button>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/report.svg" alt="report" />
                        <div className="info-container">
                            <p className="title">3rd Community Progress spike</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc('2022-08-05T08:57Z')}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-08-05T08:57Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">No Man's Sky website outage</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">First noticed at {friendlyDateTextFromUtc('2022-07-24T21:55Z')} by <BasicLink href="https://twitter.com/bomber_that/status/1551433207387750405" title="ThatBomberBoi">ThatBomberBoi on Twitter</BasicLink>. The <BasicLink href="https://nomanssky.com">website</BasicLink> was confirmed to be down.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-07-24T21:55Z')} &nbsp; → &nbsp; {defaultDateTextFromUtc('2022-07-24T22:10Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">No Man's Sky website outage</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">First noticed at {friendlyDateTextFromUtc('2022-06-03T09:54Z')} by <BasicLink href='https://twitter.com/ProceduralTRV/status/1532661985279631360' title='ProceduralTraveller'>Procedural Traveller on Twitter</BasicLink>. The <BasicLink href="https://nomanssky.com">website</BasicLink> was confirmed to be down by multiple players.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-06-03T09:54Z')} &nbsp; → &nbsp; {defaultDateTextFromUtc('2022-06-06T09:31Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">Galactic Atlas API Outage</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">First detected at around {friendlyDateTextFromUtc('2022-05-30T23:00Z')}, the Galactic Atlas API (the service which reports the progress to the Galactic Atlas website) stopped responding to Assistant for No Man's Sky trackers. The issue seems to have been resolved by HelloGames and the problem Tier was skipped.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-05-30T09:00Z')} &nbsp; → &nbsp; {defaultDateTextFromUtc('2022-05-30T23:00Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/help.svg" alt="question" />
                        <div className="info-container">
                            <p className="title">Community Progress decreasing</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">First detected at around {friendlyDateTextFromUtc('2022-05-30T09:00Z')}, the Community Mission progress percentage started decreasing for the first time ever recorded. This caused a lot of confusion in the NMS community and lead to a lot of speculation.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-05-30T09:00Z')} &nbsp; → &nbsp; {defaultDateTextFromUtc('2022-05-30T23:00Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/report.svg" alt="report" />
                        <div className="info-container">
                            <p className="title">2nd Community Progress spike</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc('2022-04-30T16:00Z')}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-04-30T16:00Z')}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/report.svg" alt="report" />
                        <div className="info-container">
                            <p className="title">1st Community Progress spike</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc('2022-04-04T09:00Z')}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc('2022-04-04T09:00Z')}</p>
                    </div>
                </div>
            </div>
        </>
    );
}