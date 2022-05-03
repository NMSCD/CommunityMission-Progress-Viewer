import classNames from "classnames";
import { ReactNode } from "react";

import { Site } from "../../constants/site";

interface IProps {
    id?: string;
    href: string;
    title?: string;
    onClick?: () => void;
    additionalClassNames?: string;
    children?: ReactNode;
}

export const BasicLink = (props: IProps) => {
    const appendRef = (baseUrl: string) => {
        if (baseUrl.includes('@')) return baseUrl;
        if (baseUrl.includes('?')) {
            return baseUrl + `&ref=${Site.ref}`;
        }
        return baseUrl + `?ref=${Site.ref}`;
    };

    const localClick = (e: any) => {
        if (props.onClick != null) {
            e.preventDefault();
            props.onClick();
        }
    }

    return (
        <a
            id={props.id}
            href={appendRef(props.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(props.additionalClassNames ?? '')}
            onClick={localClick}
            draggable={false}>
            {props.children}
        </a>
    );
}

export const GalacticAtlasWebLink = () => (<BasicLink href={Site.nms.galacticAtlas} title="Galactic Atlas">Galactic Atlas API</BasicLink>);
export const AssistantNmsWebLink = () => (<BasicLink href={Site.assistantNMS.website} title="AssistantNMS">{Site.assistantNMS.fullName}</BasicLink>);
export const AssistantNmsApiLink = () => (<BasicLink href={Site.assistantNMS.api} title="AssistantNMS API">{Site.assistantNMS.nickName} API</BasicLink>);
export const NmscdWebLink = () => (<BasicLink href={Site.nmscd.website}>{Site.nmscd.fullName}</BasicLink>);
export const Cyberpunk2350TwitterLink = () => (<BasicLink href="https://twitter.com/cyberpunk2350" title="Cyberpunk2350">Cyberpunk2350</BasicLink>);