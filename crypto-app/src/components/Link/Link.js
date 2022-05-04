import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { CopyTextButton } from 'components'
import { formatLink } from 'utils/functionUtils';
import { LinkAnchor, WebSiteSpan } from './styles';

const Link = ({link, handleCopyClick}) => (
    <>
        <LinkAnchor href={link}><FontAwesomeIcon icon={faLink} /><WebSiteSpan>{formatLink(link)}</WebSiteSpan></LinkAnchor><CopyTextButton link={link} handleCopyClick={handleCopyClick} />
    </>
)

export default Link;