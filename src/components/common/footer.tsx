import React from 'react';
import { Site } from '../../constants/site';
import { AssistantNmsWebLink, BasicLink, Cyberpunk2350TwitterLink, NmscdWebLink } from '../core/link';
import packageJson from '../../../package.json';

export const Footer: React.FC = () => {
    return (
        <footer id="footer">
            <section>
                <h2>NMSCD</h2>
                <p>This site/app was designed by <AssistantNmsWebLink /> as part of the collection of tools created by the <NmscdWebLink /></p>
                <ul className="actions">
                    <li><BasicLink href={Site.nmscd.github} additionalClassNames="button">{Site.nmscd.nickName} Github Organisation</BasicLink></li>
                </ul>
                <ul className="actions mt1">
                    <li><BasicLink href={Site.nmscd.projectsPage} additionalClassNames="button">{Site.nmscd.nickName} projects page</BasicLink></li>
                </ul>
            </section>
            <section>
                <h2>Contributors</h2>
                <dl className="alt">
                    <dt><BasicLink href={Site.assistantNMS.website} title="AssistantNMS">{Site.assistantNMS.fullName} (Kurt "Khaoz-Topsy")</BasicLink></dt>
                    <dd><i>Software Engineer</i></dd>

                    <dt className="mt1"><Cyberpunk2350TwitterLink /></dt>
                    <dd><i>Ideas man &amp; Keeper of obscure knowledge</i></dd>
                </dl>
            </section>
            <p className="copyright">© NMSCD. | {packageJson.version} | Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>
    );
}