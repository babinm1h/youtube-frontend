import React, { FC, PropsWithChildren } from 'react';
import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import cn from "classnames"

interface ICustomLinkProps {
    to: string,
}

const CustomLink: FC<PropsWithChildren<ICustomLinkProps>> = ({ to, children }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link className={cn('channelTab', {
                "before:bg-myGray": match,
            })} to={to}>
                {children}
            </Link>
        </div>
    );
};

export default CustomLink;