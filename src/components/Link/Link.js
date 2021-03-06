import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { CopyTextButton } from 'components'
import { formatLink } from 'utils/functionUtils';
import { LinkAnchor, WebSiteSpan } from './styles';

const Link = ({link, handleCopyClick, darkMode}) => (
    <>
        <LinkAnchor darkMode={darkMode} href={link}><FontAwesomeIcon icon={faLink} /><WebSiteSpan>{formatLink(link)}</WebSiteSpan></LinkAnchor><CopyTextButton darkMode={darkMode} link={link} handleCopyClick={handleCopyClick} />
    </>
)

export default Link;