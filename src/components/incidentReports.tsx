import React from 'react';
import { formatDate } from '../helper/dateHelper';
import { BasicLink } from './core/link';

interface IProps {
    isOpen: boolean;
    setIncidentsOpen: () => void;
}

export const IncidentReports: React.FC<IProps> = (props: IProps) => {

    const shortDateTextFromUtc = (date: number) => formatDate((new Date(date)), 'YYYY-MM-DD');
    const defaultDateTextFromUtc = (date: number) => formatDate((new Date(date)), 'YYYY-MM-DD HH:mm (Z)');
    const friendlyDateTextFromUtc = (date: number) => formatDate((new Date(date)), 'HH:mm on YYYY-MM-DD (Z)');

    return (
        <>
            <div className={'incidents-bg ' + (props.isOpen === true ? 'open' : 'closed')} onClick={props.setIncidentsOpen}></div>
            <div className={'incidents ' + (props.isOpen === true ? 'open' : 'closed')}>
                <button className="hidden-in-desktop mb2" style={{ width: '100%', backgroundColor: '#7d76e3' }} onClick={props.setIncidentsOpen}>
                    Close
                </button>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">Progress tracking error</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">The AssistantNMS tracker did not track data for nearly 3 weeks. This occurred during the holiday of AssistantNMS (Kurt). Simply turning it off and on again resolved the issue.</p>
                        <p className="time">{shortDateTextFromUtc(Date.UTC(2025, 3, 20))} &nbsp; → &nbsp; {shortDateTextFromUtc(Date.UTC(2025, 4, 10))}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">Progress tracking error</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">The AssistantNMS tracker did not detect that Community Mission 77 had started for the Singularity Expedition. The data has been altered for this period to reflect what was approximately displayed in game.</p>
                        <p className="time">{shortDateTextFromUtc(Date.UTC(2023, 6, 7))} &nbsp; → &nbsp; {defaultDateTextFromUtc(Date.UTC(2023, 6, 7, 7, 57))}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/error.svg" alt="error" />
                        <div className="info-container">
                            <p className="title">Progress tracking error</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">The AssistantNMS tracker did not detect that Community Mission 71 had already started for several days. Extra logic has been added to try prevent this issue occurring again. The data has also been altered for this period to reflect what was approximately displayed in game.</p>
                        <p className="time">{shortDateTextFromUtc(Date.UTC(2023, 1, 20))} &nbsp; → &nbsp; {shortDateTextFromUtc(Date.UTC(2023, 1, 23))}</p>
                    </div>
                </div>
                <div className="report">
                    <div className="heading-row noselect">
                        <img src="./assets/img/report.svg" alt="report" />
                        <div className="info-container">
                            <p className="title">3rd Community Progress spike</p>
                        </div>
                    </div>
                    <div className="body-container">
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc(Date.UTC(2022, 8, 5, 8, 57))}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 8, 5, 8, 57))}</p>
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
                        <p className="body">First noticed at {friendlyDateTextFromUtc(Date.UTC(2022, 7, 24, 21, 55))} by <BasicLink href="https://twitter.com/bomber_that/status/1551433207387750405" title="ThatBomberBoi">ThatBomberBoi on Twitter</BasicLink>. The <BasicLink href="https://nomanssky.com">website</BasicLink> was confirmed to be down.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 7, 24, 21, 55))} &nbsp; → &nbsp; {defaultDateTextFromUtc(Date.UTC(2022, 7, 24, 22, 10))}</p>
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
                        <p className="body">First noticed at {friendlyDateTextFromUtc(Date.UTC(2022, 6, 3, 9, 54))} by <BasicLink href='https://twitter.com/ProceduralTRV/status/1532661985279631360' title='ProceduralTraveller'>Procedural Traveller on Twitter</BasicLink>. The <BasicLink href="https://nomanssky.com">website</BasicLink> was confirmed to be down by multiple players.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 6, 3, 9, 54))} &nbsp; → &nbsp; {defaultDateTextFromUtc(Date.UTC(2022, 6, 6, 9, 31))}</p>
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
                        <p className="body">First detected at around {friendlyDateTextFromUtc(Date.UTC(2022, 5, 30, 23, 0))}, the Galactic Atlas API (the service which reports the progress to the Galactic Atlas website) stopped responding to Assistant for No Man's Sky trackers. The issue seems to have been resolved by HelloGames and the problem Tier was skipped.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 5, 30, 9, 0))} &nbsp; → &nbsp; {defaultDateTextFromUtc(Date.UTC(2022, 5, 30, 23, 0))}</p>
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
                        <p className="body">First detected at around {friendlyDateTextFromUtc(Date.UTC(2022, 5, 30, 9, 0))}, the Community Mission progress percentage started decreasing for the first time ever recorded. This caused a lot of confusion in the NMS community and lead to a lot of speculation.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 5, 30, 9, 0))} &nbsp; → &nbsp; {defaultDateTextFromUtc(Date.UTC(2022, 5, 30, 23, 0))}</p>
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
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc(Date.UTC(2022, 4, 30, 16, 0))}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 4, 30, 16, 0))}</p>
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
                        <p className="body">A large amount of progress was mysteriously made at around {friendlyDateTextFromUtc(Date.UTC(2022, 4, 4, 9, 0))}. The cause of this sudden spike in progress has not been officially been commented on.</p>
                        <p className="time">{defaultDateTextFromUtc(Date.UTC(2022, 4, 4, 9, 0))}</p>
                    </div>
                </div>
            </div>
        </>
    );
}